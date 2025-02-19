import type { BetterAuthPlugin } from 'better-auth';

export const geminiAPIKeyPlugin = () =>
	({
		id: 'geminiAPIKeyPlugin',
		schema: {
			user: {
				fields: {
					geminiAPIKey: {
						type: 'string',
						required: false,
						unique: false
					}
				}
			}
		}
	}) satisfies BetterAuthPlugin;
