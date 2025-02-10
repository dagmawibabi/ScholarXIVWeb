// import axios from 'axios';
import { json } from '@sveltejs/kit';
import { arxivAPICall } from '../utility/search_and_clean_papers';

export async function POST({ request }) {
	const { startIndex, maxResults, searchFilterString, sortBy, sortOrder } = await request.json();

	const cleanedPapers = await arxivAPICall(
		startIndex,
		maxResults,
		searchFilterString,
		sortBy,
		sortOrder
	);

	return json(cleanedPapers);
}
