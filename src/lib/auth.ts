import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { mongoDB } from '$db/db';

export const auth = betterAuth({
	database: mongodbAdapter(mongoDB),
	emailAndPassword: {
		enabled: true
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}
	}
});
