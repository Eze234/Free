import free from '@free';
import colors from 'colors/safe';
import {
	type ColorResolvable,
	EmbedBuilder,
	type GuildMember,
	type TextChannel
} from 'discord.js';

export const guildMemberAdd = async (member: GuildMember) => {
	await welcome(member);
};

async function welcome(member: GuildMember) {
	if (member.guild.id !== free.config.server.id) return;

	const welcome = member.client.channels.cache.get(
		free.config.server.channel.welcome
	) as TextChannel | undefined;
	const log = member.client.channels.cache.get(
		free.config.server.channel.logs
	) as TextChannel | undefined;

	const messages: string[] = [
		`%member% 🥱`,
		`%member% bienvenido`,
		'Hola %member%',
		'Hola %member%, sos el boludo número %count% que pasa por acá',
		'%member% Sybau 💔\nhttps://cdn.ezezzz.xyz/v1/cdn/get/sybau',
		'%member% :v'
	];

	if (member.user.bot) {
		member.roles.add(free.config.server.role.bot).catch(() => {});
		return;
	}

	if (welcome?.isSendable()) {
		let message = messages[Math.floor(Math.random() * messages.length)];

		if (message) {
			message = message
				.replace('%member%', `<@${member.id}>`)
				.replace('%count%', `${member.guild.memberCount}`);

			welcome
				.send({ content: message })
				.then(() => {
					member.roles.add(free.config.server.role.wachito).catch(() => {});
				})
				.catch(() => {});
		} else {
			console.log(
				`[${colors.yellow(`${member.guild.name}`)}] ${colors.bgRed('ERROR')} No welcome message found.`
			);
		}
	}

	const embed = new EmbedBuilder()
		.setTitle('New member')
		.setDescription(
			[
				`* **User:** ${member.user?.globalName ?? member.user.username} (${member.id})`,
				`* **Account created:** <t:${Math.floor(member.user.createdAt.getTime() / 1000)}:F>`,
				`* **Member count:** ${member.guild.memberCount}`
			].join('\n')
		)
		.setColor(free.config.bot.color as ColorResolvable)
		.setFooter({ text: free.config.bot.footer })
		.setTimestamp();

	if (log?.isSendable()) {
		log.send({ embeds: [embed] }).catch(() => {});
	} else {
		console.log(
			`[${colors.yellow(`${member.guild.name}`)}] ${colors.bgRed('ERROR')} No log channel found.`
		);
	}
}
