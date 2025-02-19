import { createAuthClient } from 'better-auth/svelte';
import { geminiAPIKeyPlugin } from './gemini_apikey_plugin';

export const authClient = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL!,
	plugins: [geminiAPIKeyPlugin()]
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
