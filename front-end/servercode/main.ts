import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute'
import cors from 'cors'
import { HOSTNAME, PORT } from './globals/variable'

dotenv.config() // Config environment variables
const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening at http://${HOSTNAME || "localhost"}:${PORT}`)
})