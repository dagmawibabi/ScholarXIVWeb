import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';

const db = await getDb();
const papers = db.collection('papers');
const bookmarks = db.collection('bookmarks');

export async function POST({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	const { paperID } = await request.json();

	// New bookmark obj
	const newBookmark = {
		userID: userID,
		paperID: paperID,
		createdAt: new Date().toISOString()
	};

	// Add new bookmark
	const existingBookmark = await bookmarks.findOne({ userID: userID, paperID: paperID });
	if (existingBookmark) {
		// Delete the existing bookmark
		await bookmarks.deleteOne({ userID: userID, paperID: paperID });
	} else {
		await bookmarks.insertOne(newBookmark);
	}

	// Send back all bookmarks
	const bookmarkedPapers = await getBookmarkedPapers(userID!);

	// Response
	return json(bookmarkedPapers);
}

async function getBookmarkedPapers(userID: string) {
	// Get User Bookmarks
	const result = await bookmarks.find({ userID: userID }).toArray();

	// Extract paperIDs from the bookmarks
	const paperIDs = result.map((bookmark) => bookmark.paperID);

	// Fetch papers using the extracted paperIDs
	const rawBookmarks = await papers.find({ id: { $in: paperIDs } }).toArray();

	// Add dynamic values
	// const bookmarkedPapers = await addDynamicValuesToPapers(c, rawBookmarks);

	return rawBookmarks;
}
