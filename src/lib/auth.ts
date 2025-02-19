// import { betterAuth } from 'better-auth';
// import { mongodbAdapter } from 'better-auth/adapters/mongodb';
// import { dbConnect } from '../db/db'; // your mongodb client

// export const auth = betterAuth({
// 	database: mongodbAdapter(dbConnect),
// 	//...other options
// 	emailAndPassword: {
// 		enabled: true
// 	}
// });

import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { mongoDB } from '$db/db';
import { geminiAPIKeyPlugin } from './gemini_apikey_plugin';

export const auth = betterAuth({
	database: mongodbAdapter(mongoDB),
	emailAndPassword: {
		enabled: true
	},
	plugins: [geminiAPIKeyPlugin()]
});
