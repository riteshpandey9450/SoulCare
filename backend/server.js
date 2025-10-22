import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './utils/db.js';

import userRoutes from './routes/user.route.js';
import sessionRoutes from './routes/session.route.js';
import feedbackRoutes from './routes/feedback.route.js';

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cookieParser());
app.use(cors(
  {
    origin: 'http://localhost:5001',
    credentials: true
  }
));


app.use('/api/auth', userRoutes);
app.use('/api/session', sessionRoutes);
app.use("/api/feedback", feedbackRoutes);



if (process.env.NODE_ENV === 'production') {
  console.log('Production mode enabled');
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});



