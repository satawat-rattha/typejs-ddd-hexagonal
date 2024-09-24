import { Request, Response } from 'express'
import Service from "../domain/users/service";
import Joi from 'joi'
import { BadRequest } from '../utils/errors';
import { LogDebug } from '../utils/logs';
import { User } from '../domain/users/model';


export default class UserHandler {
    constructor(public service: Service) { }

    async list(req: Request, res: Response) {
        const page: number = Number(req.query?.page || 1)
        const pageSize: number = Number(req.query?.pageSize || 10)

        const result = await this.service.list(page, pageSize)

        res.json({ result })
    }

    async inquiry(req: Request, res: Response) {
        const id = req.params.id

        const result = await this.service.get(id)

        res.json({ result })
    }

    async create(req: Request, res: Response) {
        const { error, value } = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            display: Joi.string().required()
        }).validate(req.body)
        if (!error) {
            LogDebug(error)
            throw new BadRequest('Invalid data')
        }

        const user = new User('', value.username, value.password, value.display)

        const result = await this.service.save(user)

        res.json({
            result: {
                id: result.id,
                username: result.username,
                display: result.display,
            }
        })
    }

    async update(req: Request, res: Response) {
        const { error, value } = Joi.object({
            id: Joi.string().required(),
            username: Joi.string().required(),
            display: Joi.string().required()
        }).validate(req.body)
        if (!error) {
            LogDebug(error)
            throw new BadRequest('Invalid data')
        }

        const user = new User(value.id, value.username, '', value.display)

        const result = await this.service.save(user)

        res.json({
            result: {
                id: result.id,
                username: result.username,
                display: result.display,
            }
        })
    }

    async updatePassword(req: Request, res: Response) {
        const { error, value } = Joi.object({
            id: Joi.string().required(),
            password: Joi.string().required()
        }).validate(req.body)
        if (!error) {
            LogDebug(error)
            throw new BadRequest('Invalid data')
        }

        const user = new User(value.id, '', value.password, '')

        const result = await this.service.save(user)

        res.json({
            result: {
                id: result.id,
                username: result.username,
                display: result.display,
            }
        })
    }

    async remove(req: Request, res: Response) {
        const id = req.params.id
        await this.service.remove(id)
        res.json({ result: 'success' })
    }
}