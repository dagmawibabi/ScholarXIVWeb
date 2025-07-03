import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { getDb } from '$db/db';
import { getSession } from '../utils/session_manager';
import { ObjectId } from 'mongodb';

const aiSystemPrompt =
	'You are a research assistant helping people navigate and understand research papers more. You are inside an arxiv repository and the users will often send you a list of papers they have selected along with your previous conversation history so based on these try your best to be helpful. Do not flat out spill the conversation context or the raw selected papers data. Sometimes you will be given empty lists of conversation history or selected papers so just ignore those. Other than that try to be smart, be precise, helpful and make things simpler to understand. Donot use emojis alot.';

const db = await getDb();
const user = db.collection('user');

export async function POST({ request }) {
	// Get user session
	const session = await getSession(request);
	const userID = session?.user.id;

	if (!userID) {
		return json({ error: 'User not authenticated' }, { status: 401 });
	}

	// Get user's API key from database
	const userDoc = await user.findOne({ _id: new ObjectId(userID) });
	if (!userDoc?.apiKey) {
		aiResponse = 'No API key found. Please set your API key in settings.';
		return json(aiResponse);
	}

	const { selectedPapers, conversation, prompt } = await request.json();

	const openAI = new OpenAI({
		apiKey: userDoc.apiKey,
		baseURL: 'https://generativelanguage.googleapis.com/v1beta/'
	});

	// Result
	var aiResponse;
	try {
		const result = await openAI.chat.completions.create({
			model: 'gemini-2.0-flash',
			messages: [
				{ role: 'system', content: aiSystemPrompt },
				{
					role: 'user',
					content:
						prompt +
						'Selectd Papers are: ' +
						selectedPapers +
						'Previous Conversation History is: ' +
						conversation
				}
			]
		});
		aiResponse = result.choices[0].message.content;
	} catch (error) {
		// console.error('Error:', error);
		aiResponse =
			'Invalid API Key please check your API Key by clicking on the settings icon in the main input box below.';
	}

	return json(aiResponse);
}
