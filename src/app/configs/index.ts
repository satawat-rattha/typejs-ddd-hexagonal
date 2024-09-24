import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        username: process.env.DB_USERNAME || 'test',
        password: process.env.DB_PASSWORD || 'test',
        database: process.env.DB_DATABASE || 'test'
    }
}
