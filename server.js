import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
const app = express()
const __dirname = path.resolve()

dotenv.config({ path: './config.env' });

app.use(express.json())

app.use((req, res, next) => {
    req.body.date = new Date()
    console.log(req.body);
    next()
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profileRoutes', profileRoutes)


app.use('/api/v1', express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server is running at port number ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}
start()