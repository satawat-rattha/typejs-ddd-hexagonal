import { DataSource } from 'typeorm'

export function CreateConnection(host: string, port: number, username: string, password: string, database: string): Promise<DataSource> {
    const connection = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
    })

    return connection.initialize()
}