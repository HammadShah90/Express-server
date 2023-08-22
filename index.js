import express from 'express'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
const app = express()

app.use(express.json())

app.use((req, res, next)=>{
    req.body.date = new Date()
    console.log(req.body);
    next()
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/profileRoutes', profileRoutes)





const PORT = process.env.PORT || 8000
const start = async ()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server is running at port number ${PORT}`)
        })        
    } catch (error) {
        console.log(error);
    }
}
start()