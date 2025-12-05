import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './configs/mongoDB.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// APP CONFIG
const app = express()
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(express.json())
app.use(cors())

// API ENDPOINTS
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res)=>{
    res.send("API WORKING");
})

app.listen(port, ()=>{
    console.log("SERVER STARTED ON PORT:http://localhost:" + port);
})