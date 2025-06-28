import { mongoDB } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';
import { ObjectId } from 'mongodb';

const user = mongoDB.collection('user');

export async function GET({ request }) {
    try {
        // Get user session
        const session = await getSession(request);
        const userID = session?.user.id;

        if (!userID) {
            return json({ error: 'User not authenticated' }, { status: 401 });
        }

        // Get user's API key from database
        const userDoc = await user.findOne({ _id: new ObjectId(userID) });
        
        if (!userDoc) {
            return json({ error: 'User not found' }, { status: 404 });
        }

        // Return the API key (or null if not set)
        return json({
            apiKey: userDoc.apiKey || null
        });

    } catch (error) {
        console.error('Error fetching API key:', error);
        return json({ error: 'Failed to fetch API key' }, { status: 500 });
    }
}
