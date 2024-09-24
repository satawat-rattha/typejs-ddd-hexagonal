import express from 'express'
import createUserContainer from './app/containers/user'
import { CreateConnection as createConnection } from './app/databases'
import configs from './app/configs'

const app = express()

app.use(express.json())

createConnection(configs.db.host, configs.db.port, configs.db.username, configs.db.password, configs.db.database).then(db => {
    const userRouter = createUserContainer(db)
    
    app.use('/users', userRouter)

    app.listen(configs.port, () => {
        console.log(`App listening on port ${configs.port}`)
    })
})
