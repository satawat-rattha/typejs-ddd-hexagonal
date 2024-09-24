import { User } from "./model";

export default interface Repository {
    find(id: string) : Promise<User>;
    list(page: number, pageSize: number) : Promise<User[]>;
    save(user: User) : Promise<User>;
    remove(id: string) : Promise<void>;
}