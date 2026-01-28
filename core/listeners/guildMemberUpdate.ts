import {
    Guild,
    GuildMember,
    TextChannel,
    PartialGuildMember
} from "discord.js";
import free from "@free";

export const guildMemberUpdate = async (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) => {
    await boost(oldMember, newMember);
};

async function boost (oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
    if (newMember.guild.id !== free.config.server.id) return;

    const channel = newMember.client.channels.cache.get(free.config.server.channel.boost) as TextChannel | undefined;
    const guild: Guild = newMember.guild;
    const boostRole: string | undefined = guild.roles.premiumSubscriberRole?.id ?? free.config.server.role.booster;

    if (newMember.roles.cache.size > oldMember.roles.cache.size) {
        if (boostRole && newMember.roles.cache.has(boostRole)) {
            if (channel && channel.isSendable()) {
                const messages: string[] = [
                    "%member% Esaa, casi salis de Paraguaykistan!",
                    "Gracias %member%. Ahora tenemos %count% mejoras gracias a vos",
                    "Charmander, gracias por mejorar el servidor %member%",
                    "%member% tirate uno más 😴",
                    "%member% el futuro de Paraguaykistan 👏",
                ];
                let message = messages[Math.floor(Math.random() * messages.length)] ?? '%member% sybau 💔 https://cdn.ezezzz.xyz/v1/cdn/get/sybau';

                message = message.replace("%member%", `<@${newMember.id}>`).replace("%count%", `${guild.premiumSubscriptionCount ?? 0}`);

                channel.send({ content: message }).catch(() => { });
            }
        }
    }
};