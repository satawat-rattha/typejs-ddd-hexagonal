import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt'

@Entity({
    name: 'tbl_users',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    display: string

    constructor(data?: any) {
        this.id = data?.id || ''
        this.username = data?.username || ''
        this.password = data?.password || ''
        this.display = data?.display || ''
    }

    setUsername(username: string) {
        if (username) {
            this.username = username
        }
    }

    setDisplay(display: string) {
        if (display) {
            this.display = display
        }
    }

    setPassword(password: string) {
        if (password) {
            this.password = bcrypt.hashSync(password, 10)
        }
    }
}