import express, { Request, Response } from 'express';
import productRoutes from "./routes/product-routes"
import dotenv from "dotenv";
import connectDB from './config/db';
import { notFound ,errorHandler} from './middleware/error-middleware';
dotenv.config()
const port = process.env.PORT || 5000;

connectDB()
const app = express();
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`));