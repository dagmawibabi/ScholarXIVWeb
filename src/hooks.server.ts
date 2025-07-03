// import { svelteKitHandler } from 'better-auth/svelte-kit';
// import { mongoClient } from '$db/db';
// import { auth } from '$lib/auth';

// mongoClient
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to MongoDB');
// 	})
// 	.catch((e) => {
// 		console.error('MongoDB connection error:', e);
// 	});

// export async function handle({ event, resolve }) {
// 	return svelteKitHandler({ event, resolve, auth });
// }

import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/auth';

// Initialize auth when the server starts
const authInstance = await auth;

export async function handle({ event, resolve }) {
  return svelteKitHandler({ event, resolve, auth: authInstance });
}
