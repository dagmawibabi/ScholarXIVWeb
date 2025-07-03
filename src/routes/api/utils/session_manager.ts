import { auth } from '$lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSession(request: any) {
	try {
		const authInstance = await auth;
		if (!authInstance?.api?.getSession) {
			console.error('Auth not properly initialized');
			return null;
		}
		const session = await authInstance.api.getSession({
			headers: request.headers
		});
		return session;
	} catch (error) {
		console.error('Error getting session:', error);
		return null;
	}
}
