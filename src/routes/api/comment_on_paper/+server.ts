import { mongoDB } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';

// const papers = mongoDB.collection('papers');
const comments = mongoDB.collection('comments');

export async function POST({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	const { parentID, extractedID, comment } = await request.json();

	const newComment = {
		userID: userID,
		parentID: parentID,
		extractedID: extractedID,
		comment: comment,
		createdAt: new Date().toISOString()
	};

	await comments.insertOne(newComment);

	// Get root comments
	const rawComments = await comments.find({ extractedID: extractedID, parentID: null }).toArray();

	// Send back updated paper
	// const likedPaper = [await papers.findOne({ id: paperID })];
	// const updatedPaper = await addLikeValueToPapers(c, likedPaper);

	// Response
	return json(rawComments);
}
