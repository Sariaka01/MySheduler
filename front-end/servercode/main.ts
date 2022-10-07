import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute'

dotenv.config() // Config environment variables
const app = express()

app.use(express.json())
app.use('/user', userRouter)

app.listen(process.env.PORT || 3001, () => {
    console.log(`listening at http://${process.env.HOSTNAME || "localhost"}:${process.env.PORT}`)
})