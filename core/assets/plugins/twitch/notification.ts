import crypto from 'node:crypto';
import free from '@free';
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';
import { EventSubHttpListener } from '@twurple/eventsub-http';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import color from 'colors/safe';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type Client,
	type ColorResolvable,
	EmbedBuilder,
	type Message
} from 'discord.js';
import message from '../messages.json';
import configuration from './twitch.json';

export default async function startMonitoring(bot: Client) {
	console.log(
		`[${color.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${color.bgGreen('SUCCESS')} Twitch notifications enabled!`
	);

	if (!configuration) return;

	const authProvider = new AppTokenAuthProvider(
		configuration.client_id,
		configuration.client_secret
	);
	const client = new ApiClient({ authProvider });
	const secret = crypto.randomBytes(32).toString('base64');
	const channel = bot.channels.cache.get(
		free.config.server.channel.announcements
	);

	const listener = new EventSubHttpListener({
		apiClient: client,
		adapter: new NgrokAdapter({
			ngrokConfig: { authtoken: configuration.ngrok }
		}),
		secret: secret
	});

	listener.start();

	const user = await client.users.getUserByName(configuration.broadcaster);

	if (!user) {
		console.log(
			`[${color.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${color.bgRed('ERROR')} Twitch user "${configuration.broadcaster}" not found.`
		);
		return;
	}

	listener.onStreamOnline(user.id, async (tw) => {
		console.log(
			`[${color.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${color.bgGreen('SUCCESS')} ${user.displayName} is live now.`
		);

		const stream = await tw.getStream();
		const broadcaster = await tw.getBroadcaster();
		let thumbnailUrl = stream?.getThumbnailUrl(400, 225);

		if (!thumbnailUrl) {
			thumbnailUrl = 'https://cdn.ezezzz.xyz/v1/cdn/get/sybau';
		}

		const Embed = new EmbedBuilder()
			.setAuthor({
				name: broadcaster.displayName,
				iconURL: broadcaster.profilePictureUrl,
				url: `https://twitch.tv/${broadcaster.name}`
			})
			.setTitle(stream?.title || 'Sybau 💔')
			.setURL(`https://twitch.tv/${broadcaster.name}`)
			.setImage(thumbnailUrl)
			.addFields({
				name: 'Categoría',
				value: `${stream?.gameName ?? 'Charlando'}`
			})
			.setColor('9146ff' as ColorResolvable)
			.setFooter({
				text: free.config.bot.footer,
				iconURL: bot.user?.displayAvatarURL()
			})
			.setTimestamp();

		if (channel?.isTextBased() && channel.isSendable()) {
			channel
				.send({
					embeds: [Embed],
					components: [
						new ActionRowBuilder<ButtonBuilder>().addComponents(
							new ButtonBuilder({
								label: 'Ver',
								url: `https://twitch.tv/${broadcaster.name}`,
								style: ButtonStyle.Link
							})
						)
					],
					content: [
						message.twitch
							.replace('%username%', broadcaster.displayName)
							.replace('%url%', `https://twitch.tv/${broadcaster.name}`),
						'@everyone'
					].join('\n')
				})
				.then((msg: Message) => {
					msg.react('🥱').catch(() => {});
					console.log(
						`[${color.yellow(`${bot.user?.tag ?? 'Eze#0234'}`)}] ${color.bgGreen('SUCCESS')} ${broadcaster.displayName} started a stream with the title: ${stream?.title ?? 'Sybau 💔'}`
					);
				});
		}
	});
}
