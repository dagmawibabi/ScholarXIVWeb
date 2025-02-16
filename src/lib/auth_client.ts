import { createAuthClient } from 'better-auth/svelte';
import { BETTER_AUTH_URL } from '$env/static/private';

export const authClient = createAuthClient({
	baseURL: BETTER_AUTH_URL!
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
