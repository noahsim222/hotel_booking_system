import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Local Imports --Our Routes
import authRoute from './routes/auth';
import usersRoute from './routes/users';
import hotelsRoute from './routes/hotels';
import roomsRoute from './routes/rooms';

const App: Express = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

const connectMongo = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO}`);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});

//Middlewares
App.use(express.json());
App.use(cookieParser());
App.use(cors());

App.use('/api/auth', authRoute);
App.use('/api/users', usersRoute);
App.use('/api/hotels', hotelsRoute);
App.use('/api/rooms', roomsRoute);

App.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

App.listen(PORT, (): void => {
  connectMongo();
  console.log(`Server is running on port: ${PORT}`);
});
