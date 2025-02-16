import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import {
	baseURL,
	defaultMaxResults,
	defaultSortBy,
	defaultSortOrder,
	defaultStartIndex,
	pdfBaseURL
} from '../constants';
import type { searchStringOBJI } from '../types/types';

// await axios.get(`${baseURL}${searchFilterString}&start=${startIndex}&max_results=${maxResults}&sortBy=${sortBy}&sortOrder=${sortOrder}`);

export async function arxivAPICall(
	startIndex = defaultStartIndex,
	maxResults = defaultMaxResults,
	searchFilterString: searchStringOBJI,
	sortBy = defaultSortBy,
	sortOrder = defaultSortOrder
) {
	const createdSearchString = createSearchString(searchFilterString);

	const responseXML = await axios.get(
		`${baseURL}${createdSearchString}&start=${startIndex}&max_results=${maxResults}&sortBy=${sortBy}&sortOrder=${sortOrder}`
	);

	const jsObj = parseXMLToJS(responseXML.data);
	const rawPapers = jsObj['feed']['entry'] || [];

	const cleanedPapers = await cleanPapers(rawPapers);

	return cleanedPapers;
}

// Create the filtering search string connected with AND
function createSearchString(searchFilter: searchStringOBJI) {
	// Check if the 'all' key has a value, return it if so
	if (searchFilter.all) {
		return `all:${searchFilter.all}`;
	}

	const searchParams = [];

	// Iterate over other keys only if 'all' is not present or empty
	for (const key in searchFilter) {
		if (key !== 'all' && searchFilter[key as keyof typeof searchFilter]) {
			// Skip 'all' key
			searchParams.push(`${key}:${searchFilter[key as keyof typeof searchFilter]}`);
		}
	}

	return searchParams.join('+AND+');
}

// Function to parse XLM to JS object
export function parseXMLToJS(data: string) {
	const parser = new XMLParser();
	const jsObj = parser.parse(data);
	return jsObj;
}

// Function to Identify PDF link
export function parsePDFLinkFromPaperID(paperID: string) {
	const extractedID = paperID.split('/').pop();
	let pdfURL = '';
	if (extractedID && extractedID.includes('.')) {
		pdfURL = `${pdfBaseURL}/${extractedID}`;
	} else {
		pdfURL = `${pdfBaseURL}/cond-mat/${extractedID}`;
	}
	return pdfURL;
}

// Function to remove /n from texts
export function removeNewLineCharacter(text: string) {
	const cleanedText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
	return cleanedText;
}

// Funtion to clear the response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cleanPapers(rawPapers: any) {
	const cleanedPapers = [];
	for (const eachPaper of rawPapers) {
		const curPaper = {
			id: eachPaper['id'],
			extractedID: eachPaper['id'].split('/').pop(),
			updated: eachPaper['updated'],
			published: eachPaper['published'],
			title: eachPaper['title'],
			summary: eachPaper['summary'],
			authors: eachPaper['author'],
			doi: eachPaper['arxiv:doi'] || '',
			journalRef: eachPaper['arxiv:journal_ref'] || '',
			primaryCategory: eachPaper['arxiv:primary_category'] || '',
			category: eachPaper['arxiv:category'] || '',
			comment: eachPaper['arxiv:comment'] || '',
			pdfLink: parsePDFLinkFromPaperID(eachPaper['id'])
		};

		// Clean Title
		const cleanedTitle = removeNewLineCharacter(curPaper['title']);

		// Clean Summary
		const cleanedSummary = removeNewLineCharacter(curPaper['summary']);

		// Format Authors
		const authorList = [];
		try {
			for (const eachAuthor of curPaper['authors']) {
				authorList.push(eachAuthor['name']);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e: unknown) {
			authorList.push(eachPaper['author']['name']);
		}

		// Add to response
		curPaper['title'] = cleanedTitle;
		curPaper['summary'] = cleanedSummary;
		curPaper['authors'] = authorList;
		cleanedPapers.push(curPaper);
	}
	return cleanedPapers;
}
