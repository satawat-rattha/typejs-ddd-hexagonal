import { Router } from 'express'
import UserHandler from '../handlers/userHandler';

export default function CreateUserRoute(handler: UserHandler) :Router {
    const router = Router()

    router.get('/', handler.list)
    router.get('/:id', handler.inquiry)
    router.post('/', handler.create)
    router.put('/:id', handler.update)
    router.put('/:id/password', handler.updatePassword)
    router.delete('/:id', handler.remove)

    return router
}