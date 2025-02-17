import { mongoDB } from '$db/db';

// const papers = mongoDB.collection('papers');
const bookmarks = mongoDB.collection('bookmarks');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addValuesToPapers(papers: any, userID: any) {
	const userBookmarkedPapers = await bookmarks
		.find({ userID: userID })
		// .project({ paperID: 1 })
		.toArray();

	const bookmarkedPaperIDs = [];
	for (const eachBookmarkedPaper of userBookmarkedPapers) {
		bookmarkedPaperIDs.push(eachBookmarkedPaper.paperID);
	}

	// IsBookmarked
	const papersWithBookmarkStatus = [];
	for (const eachPaper of papers) {
		eachPaper.isBookmarked = bookmarkedPaperIDs.includes(eachPaper.extractedID);
		papersWithBookmarkStatus.push(eachPaper);
	}

	return papersWithBookmarkStatus;
}
