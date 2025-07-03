import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';
import { ObjectId } from 'mongodb';

const db = await getDb();
const user = db.collection('user');

export async function POST({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	const { apiKey } = await request.json();

	// Update API Key
	if (!userID) {
		console.error('No user ID found in session');
		return json({ error: 'User not authenticated' }, { status: 401 });
	}

	try {
		const result = await user.findOneAndUpdate(
			{ _id: new ObjectId(userID) },
			{ $set: { apiKey } },
			{ returnDocument: 'after' }
		);

		if (!result) {
			console.error('User not found with ID:', userID);
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json({ success: true, user: result });
	} catch (error) {
		console.error('Error updating API key:', error);
		return json({ error: 'Failed to update API key' }, { status: 500 });
	}
}
