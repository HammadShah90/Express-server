import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './db/connect.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
const app = express()
const __dirname = path.resolve()

dotenv.config({ path: './.env' });

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use((req, res, next) => {
    req.body.date = new Date().toLocaleString()
    console.log(req.body);
    next()
})
// Middlewares


// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profileRoutes', profileRoutes)


app.use('/api/v1', express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Backend server is running`)
        })
        await connectDB(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}
start()