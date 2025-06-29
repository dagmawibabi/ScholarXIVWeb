import { createAuthClient } from 'better-auth/svelte';
import { anonymousClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL!,
	plugins: [anonymousClient()]
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
