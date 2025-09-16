import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';


import liveRoutes from './routes/live.route.js';
import userRoutes from './routes/user.route.js';
import connectDB from './utils/db.js';



const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.use('/api/users', liveRoutes);
app.use('/api/auth', userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});



