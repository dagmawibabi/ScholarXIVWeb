// import { MongoClient } from 'mongodb';
// // import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// export const mongoClient = new MongoClient(process.env.MONGO_URI!);
// export const mongoDB = mongoClient.db('scholarxiv');

// // export const connectMongoDB = async () => {
// // 	await mongoose.connect(process.env.MONGO_URI!);
// // };

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGO_URI) {
	throw new Error('Please define the MONGO_URI environment variable');
}

const uri = process.env.MONGO_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export const getDb = async () => {
	const client = await clientPromise;
	return client.db('scholarxiv');
};
