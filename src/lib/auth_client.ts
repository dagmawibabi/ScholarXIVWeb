import { createAuthClient } from 'better-auth/svelte';
import dotenv from 'dotenv';
dotenv.config();

export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL!
});

export const {
	signIn,
	signUp,
	signOut,
	forgetPassword,
	changePassword,
	changeEmail,
	updateUser,
	resetPassword,
	useSession
} = authClient;
