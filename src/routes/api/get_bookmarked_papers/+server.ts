// import axios from 'axios';
import { mongoDB } from '$db/db';
import { json } from '@sveltejs/kit';

const papers = mongoDB.collection('papers');
const bookmarks = mongoDB.collection('bookmarks');

export async function POST({ request }) {
	const { userID } = await request.json();

	// Get User Bookmarks
	const result = await bookmarks.find({ userID: userID }).toArray();

	// Extract paperIDs from the bookmarks
	const paperIDs = result.map((bookmark) => bookmark.paperID);

	// Fetch papers using the extracted paperIDs
	const rawBookmarks = await papers.find({ extractedID: { $in: paperIDs } }).toArray();

	for (const eachBookmarks of rawBookmarks) {
		eachBookmarks.isBookmarked = true;
	}

	// console.log(rawBookmarks[0]);

	// Add dynamic values
	// const bookmarkedPapers = await addDynamicValuesToPapers(c, rawBookmarks);

	// Response
	return json(rawBookmarks);
}
