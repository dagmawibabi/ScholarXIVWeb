import { mongoDB } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';

// const papers = mongoDB.collection('papers');
const likedPapers = mongoDB.collection('likedpapers');

export async function POST({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	const { paperID } = await request.json();

	const newLike = {
		userID: userID,
		paperID: paperID,
		createdAt: new Date().toISOString()
	};

	// Check if it's been liked before
	const existingLike = await likedPapers.findOne({ userID: userID, paperID: paperID });

	// Add or remove like
	if (existingLike) {
		// Delete the existing like
		await likedPapers.deleteOne({ userID: userID, paperID: paperID });
	} else {
		await likedPapers.insertOne(newLike);
	}

	// Send back updated paper
	// const likedPaper = [await papers.findOne({ id: paperID })];
	// const updatedPaper = await addLikeValueToPapers(c, likedPaper);

	// Response
	return json(newLike);
}
