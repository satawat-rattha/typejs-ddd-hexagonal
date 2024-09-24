import { DataSource } from "typeorm"
import { User as UserEntity } from "../databases/entity/user"
import { User } from "../domain/users/model"
import Repository from "../domain/users/repository"
import { ErrConflictData, ErrUserNotFound } from "../domain/users/errors"

export class UserRepo implements Repository {
    constructor(public db: DataSource) { }
    async find(id: string): Promise<User> {
        const entity = await this.db.manager.findOne(UserEntity, {
            where: {
                id,
            }
        })

        if (!entity) {
            throw ErrUserNotFound
        }

        const result = new User(entity.id, entity.username, entity.password, entity.display)

        return result
    }
    async save(data: User): Promise<User> {
        if (!data) {
            throw ErrConflictData
        }

        if (data.id) {
            return this.update(data)
        }

        return this.create(data)
    }

    private async create(user: User): Promise<User> {
        const data = new UserEntity()

        data.username = user.username
        data.display = user.display
        data.setPassword(user.password)

        const entity = await this.db.manager.save(data)

        return new User(entity.id, entity.username, entity.password, entity.display)
    }

    private async update(user: User): Promise<User> {
        const data = await this.db.manager.findOne(UserEntity, {
            where: {
                id: user.id
            }
        })

        if (!data) {
            throw ErrUserNotFound
        }

        data.setUsername(user.username)
        data.setDisplay(user.display)
        data.setPassword(user.password)

        const entity = await this.db.manager.save(data)

        return new User(entity.id, entity.username, entity.password, entity.display)
    }

    async list(page: number, pageSize: number): Promise<User[]> {
        const listEntity = await this.db.manager.find(UserEntity, {
            skip: (page - 1) * pageSize,
            take: pageSize
        })

        return listEntity.map(data => new User(data.id, data.username, data.password, data.display))
    }

    async remove(id: string) {
        this.db.manager.delete(UserEntity, { id })
    }
}