import { AppError, InternalError } from "../../utils/errors";
import { LogError } from "../../utils/logs";
import { User } from "./model";
import Repository from "./repository";

export default class Service {
    constructor(public repo: Repository) { }

    async get(id: string): Promise<User> {
        try {
            const result = await this.repo.find(id)

            return result
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            LogError(error)

            throw new InternalError("Internal server error")
        }
    }

    async list(page: number, pageSize: number): Promise<User[]> {
        try {
            const result = await this.repo.list(page, pageSize)

            return result
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            LogError(error)

            throw new InternalError("Internal server error")
        }
    }

    async save(user: User): Promise<User> {
        try {
            const result = await this.repo.save(user)

            return result
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            LogError(error)

            throw new InternalError("Internal server error")
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.repo.remove(id)
        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            LogError(error)

            throw new InternalError("Internal server error")
        }
    }
}