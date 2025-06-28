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
