// import axios from 'axios';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { addValuesToPapers } from '../utils/add_values_to_papers';
import { getSession } from '../utils/session_manager';
import { mongoDB } from '$db/db';

const papers = mongoDB.collection('papers');
// const bookmarks = mongoDB.collection('bookmarks');
const comments = mongoDB.collection('comments');
const users = mongoDB.collection('user');

export async function POST({ request }) {
	const { extractedID } = await request.json();

	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	// Get Paper Comments
	const rawPaper = [await papers.findOne({ extractedID: extractedID })];
	const paperWithDynamicValues = await addValuesToPapers(rawPaper, userID);

	// Get root comments
	const rawComments = await comments.find({ extractedID: extractedID, parentID: null }).toArray();

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

	const result = {
		paper: paperWithDynamicValues[0],
		comments: commentsWithUserInfo
	};

	return json(result);
}
