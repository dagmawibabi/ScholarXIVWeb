import { MongoClient } from 'mongodb';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const mongoClient = new MongoClient(process.env.MONGO_URI!);
export const mongoDB = mongoClient.db('scholarxiv');

// export const connectMongoDB = async () => {
// 	await mongoose.connect(process.env.MONGO_URI!);
// };
