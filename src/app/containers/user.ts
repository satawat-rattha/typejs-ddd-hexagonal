import { DataSource } from "typeorm";
import UserHandler from "../handlers/userHandler";
import { UserRepo } from "../repositories/userRepo";
import Service from "../domain/users/service";
import { Router } from "express";
import createUserRoute from "../router/users";

export default function CreateUserContainer(db : DataSource): Router {
    const repo = new UserRepo(db)
    const service = new Service(repo)
    const handler = new UserHandler(service)

    return createUserRoute(handler)
}