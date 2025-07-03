import { getDb } from '$db/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveToDB(cleanedPapers: any) {
	const db = await getDb();
	const papers = db.collection('papers');

	// Retrieve all existing papers from the database once
	const existingPapers = await papers.find({}).toArray();
	const existingIDs = new Set(existingPapers.map((paper) => paper.extractedID));

	// Collect new papers to insert
	const papersToInsert = [];
	for (const paper of cleanedPapers) {
		if (!existingIDs.has(paper.extractedID)) {
			papersToInsert.push(paper);
		}
	}

	// Insert all new papers at once
	if (papersToInsert.length > 0) {
		await papers.insertMany(papersToInsert);
	}
}
