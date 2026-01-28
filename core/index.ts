console.clear();

import free from '@free';
import {
	Client,
	type GuildMember,
	IntentsBitField,
	type PartialGuildMember,
	Partials
} from 'discord.js';

/**@Eze234 Note: Define the client */
const client = new Client({
	intents: free.config.bot.intents.map(
		(intent: string) =>
			IntentsBitField.Flags[intent as keyof typeof IntentsBitField.Flags]
	),
	partials: free.config.bot.partials.map(
		(partial: string) => Partials[partial as keyof typeof Partials]
	)
});

import { guildMemberAdd } from '@listeners/guildMemberAdd';
import { guildMemberUpdate } from '@listeners/guildMemberUpdate';
/** Listeners */
import { ready } from '@listeners/ready';

client.on('clientReady', (c: Client) => ready(c));
client.on('guildMemberAdd', (member: GuildMember) => guildMemberAdd(member));
client.on(
	'guildMemberUpdate',
	(
		oldMember: GuildMember | PartialGuildMember,
		newMember: GuildMember | undefined
	) => guildMemberUpdate(oldMember, newMember!)
);

client.login(free.env.DISCORD_TOKEN);
