import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT || 5000

class Server {
    #versioning = "/api/v1"
    constructor() {
        this.useMiddlewares()
        this.addRoutes()
        this.connectToDb()
    }

    useMiddlewares() {
        app.use(morgan('dev'))
        app.use(cors())
        app.use(express.json())
    }

    newRoute(path) {
        return `${this.#versioning}/${path}`
    }

    addRoutes() {
        app.use(this.newRoute("auth"), authRoutes)
    }

    async connectToDb() {
        const dbUrl = process.env.DATABASE_URL || ""
        try {
            await mongoose.connect(dbUrl)
            this.startServer()
        } catch (error) {
            console.log('could not connect to db', error)
        }
    }

    startServer() {
        app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`))
    }
}

new Server()