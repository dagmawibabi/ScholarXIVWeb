// import axios from 'axios';
import { json } from '@sveltejs/kit';
import { addValuesToPapers } from '../utils/add_values_to_papers';
import { getSession } from '../utils/session_manager';
import { mongoDB } from '$db/db';

const papers = mongoDB.collection('papers');
// const bookmarks = mongoDB.collection('bookmarks');
const comments = mongoDB.collection('comments');

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

	const result = {
		paper: paperWithDynamicValues[0],
		comments: rawComments
	};

	return json(result);
}
