// import axios from 'axios';
import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';

const db = await getDb();
const papers = db.collection('papers');
const bookmarks = db.collection('bookmarks');

import { addValuesToPapers } from '../utils/add_values_to_papers';
import { getSession } from '../utils/session_manager';

export async function GET({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	// Get User Bookmarks
	const result = await bookmarks.find({ userID: userID }).toArray();

	// Extract paperIDs from the bookmarks
	const paperIDs = result.map((bookmark) => bookmark.paperID);

	// Fetch papers using the extracted paperIDs
	const rawBookmarks = await papers.find({ extractedID: { $in: paperIDs } }).toArray();

	for (const eachBookmarks of rawBookmarks) {
		eachBookmarks.isBookmarked = true;
	}

	// Add dynamic values
	const bookmarkedPapersWithValues = await addValuesToPapers(rawBookmarks, userID);

	// Response
	return json(bookmarkedPapersWithValues);
}
