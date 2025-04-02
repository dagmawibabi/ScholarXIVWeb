import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL!
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
