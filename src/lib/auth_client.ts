import { createAuthClient } from 'better-auth/svelte';
export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173'
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
