import type { BetterAuthClientPlugin } from 'better-auth';
import type { geminiAPIKeyPlugin } from './index'; // make sure to import the server plugin as a type

type geminiAPIKeyPlugin = typeof geminiAPIKeyPlugin;

export const geminiAPIKeyClientPlugin = () => {
	return {
		id: 'geminiAPIKeyPlugin',
		$InferServerPlugin: {} as ReturnType<geminiAPIKeyPlugin>
	} satisfies BetterAuthClientPlugin;
};
