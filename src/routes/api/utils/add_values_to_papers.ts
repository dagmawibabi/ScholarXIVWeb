import { getDb } from '$db/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addValuesToPapers(papers: any, userID: any) {
	const db = await getDb();
	const bookmarks = db.collection('bookmarks');
	const likedPapers = db.collection('likedpapers');

	// User Bookmarked Papers
	const userBookmarkedPapers = await bookmarks
		.find({ userID: userID })
		// .project({ paperID: 1 })
		.toArray();
	const bookmarkedPaperIDs = [];
	for (const eachBookmarkedPaper of userBookmarkedPapers) {
		bookmarkedPaperIDs.push(eachBookmarkedPaper.paperID);
	}

	// User Liked Papers
	const userLikedPapers = await likedPapers
		.find({ userID: userID })
		// .project({ paperID: 1 })
		.toArray();
	const likedPaperIDs = [];
	for (const eachLikedPaper of userLikedPapers) {
		likedPaperIDs.push(eachLikedPaper.paperID);
	}

	// Is Bookmarked and Liked
	const papersWithValues = [];
	for (const eachPaper of papers) {
		eachPaper.isBookmarked = bookmarkedPaperIDs.includes(eachPaper.extractedID);
		eachPaper.isLiked = likedPaperIDs.includes(eachPaper.extractedID);
		eachPaper.likeCount = await likedPapers.countDocuments({ paperID: eachPaper.extractedID });
		papersWithValues.push(eachPaper);
	}

	return papersWithValues;
}
