import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';
import { getSession } from '../utils/session_manager';
import { ObjectId } from 'mongodb';

// const papers = mongoDB.collection('papers');
const db = await getDb();
const comments = db.collection('comments');
const users = db.collection('user');

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
	// Get user details for each comment
	const commentsWithUserInfo = await Promise.all(
		rawComments.map(async (comment) => {
			const user = await users.findOne({ _id: new ObjectId(comment.userID) });
			return {
				...comment,
				commenter: {
					id: user?._id.toString(),
					name: user?.name || 'Anonymous',
					email: user?.email
				}
			};
		})
	);

	// Response
	return json(commentsWithUserInfo);
}
