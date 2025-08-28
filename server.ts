import path from "path"
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import connectDB from './config/db';
import { notFound ,errorHandler} from './middleware/error-middleware';
dotenv.config()
import productRoutes from "./routes/product-routes"
import userRoutes from "./routes/user-routes"
import orderRoutes from "./routes/order-routes"
import cookieParser from 'cookie-parser';
//import uploadRoutes from "./routes/upload-route"


const port = process.env.PORT || 5000;

connectDB()
const app = express();
//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/products', productRoutes);   
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
//app.use("/api/upload", uploadRoutes)

app.get('/api/config/paypal', (req:any, res:any) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`));