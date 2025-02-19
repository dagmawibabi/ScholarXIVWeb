import { mongoDB } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';

const user = mongoDB.collection('user');

export async function POST({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	const { apiKey } = await request.json();

	// Update API Key
	const result = await user.findOneAndUpdate({ id: userID }, { $set: { apiKey } });

	// Response
	return json(result);
}
