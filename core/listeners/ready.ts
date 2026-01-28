import { saveCache } from '@assets/database/index';
import Twitch from '@assets/plugins/twitch/notification';
import free from '@free';
import colors from 'colors/safe';
import { ActivityType, type Client } from 'discord.js';

export const ready = async (client: Client) => {
	presence(client);
	hello(client);
	await connectDatabase(client);
	await notifications(client);
};

function hello(client: Client) {
	console.log(
		colors.blue(`
███████╗███████╗███████╗
██╔════╝╚══███╔╝██╔════╝
█████╗    ███╔╝ █████╗  
██╔══╝   ███╔╝  ██╔══╝  
███████╗███████╗███████╗
╚══════╝╚══════╝╚══════╝
`)
	);
	console.log(
		`[${colors.yellow(`${client?.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgGreen('SUCCESS')} Hi wacho`
	);
}

function presence(client: Client) {
	const activities = [
		{
			type: ActivityType.Custom,
			state: '🚭',
			name: 'Fafnir'
		}
	];
	client.user?.setPresence({ activities, status: 'idle' });
}

async function connectDatabase(bot: Client) {
	saveCache();

	free.utils.sleep(2000);

	try {
		free?.prisma
			?.$connect()
			.then(() => {
				console.log(
					`[${colors.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgGreen('SUCCESS')} Database connected`
				);
			})
			.catch((err: unknown) => {
				if (err instanceof Error) {
					console.log(
						`[${colors.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgRed('ERROR')} Database connection failed: ${err.message}`
					);
				}
			});
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(
				`[${colors.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgRed('ERROR')} Database connection failed: ${e.message}`
			);
		}
	}
}

async function notifications(client: Client) {
	console.log(
		`[${colors.yellow(`${client.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgBlue('INFO')} Starting notifications plugin...`
	);
	Twitch(client);
}
