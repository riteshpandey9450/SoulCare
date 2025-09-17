import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './utils/db.js';

import userRoutes from './routes/user.route.js';
import sessionRoutes from './routes/session.route.js';



const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // ✅ for x-www-form-urlencoded
app.use(express.json()); 
app.use(cookieParser());
app.use(cors());


app.use('/api/auth', userRoutes);
app.use('/api/session', sessionRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});



