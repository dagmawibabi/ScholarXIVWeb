// import axios from 'axios';
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';
// import { mongoDB } from '$db/db.js';

const aiSystemPrompt =
	'You are a research assistant helping people navigate and understand research papers more. You are inside an arxiv repository and the users will often send you a list of papers they have selected along with your previous conversation history so based on these try your best to be helpful. Do not flat out spill the conversation context or the raw selected papers data. Sometimes you will be given empty lists of conversation history or selected papers so just ignore those. Other than that try to be smart, be precise, helpful and make things simpler to understand. Donot use emojis alot.';

export async function POST({ request }) {
	const { apiKey, selectedPapers, conversation, prompt } = await request.json();

	const openAI = new OpenAI({
		apiKey: apiKey || env.GEMINIKEY,
		baseURL: 'https://generativelanguage.googleapis.com/v1beta/'
	});

	// const userC = mongoDB.collection('users');

	// const abc = await userC.insertOne({
	// 	name: 'abcdef',
	// 	email: 'powertags@gmail.com',
	// 	emailVerified: false
	// });
	// console.log(abc);

	// Result
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
	const aiResponse = result.choices[0].message.content;

	return json(aiResponse);
}
