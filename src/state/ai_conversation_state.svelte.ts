interface message {
	from: string;
	content: string;
}

interface IAIConversation {
	conversation: message[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selectedPapersList: any[];
	selectedPapersIDList: string[];
	models: { name: string; model: string }[];
	currentModel: { name: string; model: string };
}

export const aiConversationState = $state<IAIConversation>({
	conversation: [],
	selectedPapersList: [],
	selectedPapersIDList: [],
	models: [
		{ name: 'Gemini', model: 'gemini-1.5-flash' },
		{ name: 'Grok', model: 'grok-beta' }
	],
	currentModel: { name: 'Gemini', model: 'gemini-1.5-flash' }
});
