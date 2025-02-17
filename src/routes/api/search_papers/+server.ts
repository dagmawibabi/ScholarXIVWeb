// import axios from 'axios';
import { json } from '@sveltejs/kit';
import { arxivAPICall } from '../utils/search_and_clean_papers';
import { saveToDB } from '../utils/save_papers_to_db';
import { addValuesToPapers } from '../utils/add_values_to_papers';

export async function POST({ request }) {
	const { startIndex, maxResults, searchFilterString, sortBy, sortOrder, userID } =
		await request.json();

	let cleanedPapers = await arxivAPICall(
		startIndex,
		maxResults,
		searchFilterString,
		sortBy,
		sortOrder
	);

	cleanedPapers = await addValuesToPapers(cleanedPapers, userID);
	await saveToDB(cleanedPapers);

	return json(cleanedPapers);
}
