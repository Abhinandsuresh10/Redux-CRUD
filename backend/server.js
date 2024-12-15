import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import path from 'path'
import cors from 'cors'
import fs from 'fs'

connectDB();


const Port = process.env.PORT || 5000;

const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

app.use(notFound);
app.use(errorHandler)

app.get('/', (req,res) => res.send('server is ready'))

app.listen(Port, () => {
    console.log(`server started on port http://localhost${Port}`)
})