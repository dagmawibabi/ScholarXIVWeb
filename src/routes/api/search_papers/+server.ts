// import axios from 'axios';
import { json } from '@sveltejs/kit';
import { arxivAPICall } from '../utils/search_and_clean_papers';
import { saveToDB } from '../utils/save_papers_to_db';
import { addValuesToPapers } from '../utils/add_values_to_papers';
import { getSession } from '../utils/session_manager';

export async function POST({ request }) {
	try {
		const { startIndex, maxResults, searchFilterString, sortBy, sortOrder } = await request.json();

		// Get User ID
		const session = await getSession(request);
		const userID = session?.user?.id || null; // Handle case where user is not logged in

		let cleanedPapers = await arxivAPICall(
			startIndex,
			maxResults,
			searchFilterString,
			sortBy,
			sortOrder
		);

		// Only proceed if we got papers back
		if (cleanedPapers && cleanedPapers.length > 0) {
			cleanedPapers = await addValuesToPapers(cleanedPapers, userID);
			await saveToDB(cleanedPapers);
		}

		return json(cleanedPapers || []);
	} catch (error) {
		console.error('Error in search_papers API:', error);
		return json({ error: 'Failed to fetch papers' }, { status: 500 });
	}
}
