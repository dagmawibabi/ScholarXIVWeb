import { auth } from '$lib/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSession(request: any) {
	const session = await auth.api.getSession({
		headers: request.headers
	});
	return session;
}
