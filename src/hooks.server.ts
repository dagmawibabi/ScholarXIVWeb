import { svelteKitHandler } from 'better-auth/svelte-kit';
import { mongoClient } from '$db/db';
import { auth } from '$lib/auth';

mongoClient
	.connect()
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((e) => {
		console.error('MongoDB connection error:', e);
	});

export async function handle({ event, resolve }) {
	return svelteKitHandler({ event, resolve, auth });
}

// connectMongoDB()
// 	.then(() => {
// 		console.log('Connected to MongoDB');
// 	})
// 	.catch((e) => {
// 		console.error('MongoDB connection error:', e);
// 	});

// import { auth } from './lib/auth'; // path to your auth file
// import { svelteKitHandler } from 'better-auth/svelte-kit';
// import { type Handle } from '@sveltejs/kit';
// import { dbConnect } from './db/db';

// // Connect DB
// export const handle: Handle = async ({ event, resolve }) => {
// 	try {
// 		await dbConnect();
// 		console.log('DB connected');
// 	} catch (error) {
// 		console.error('DB connection error:', error);
// 	}

// 	return svelteKitHandler({ event, resolve, auth });
// };
