console.clear();

import {
    Client,
    GuildMember,
    IntentsBitField,
    Partials
} from "discord.js";
import free from "@free";

/**@Eze234 Note: Define the client */
const client = new Client({
    intents: free.config.bot.intents.map((intent: string) => IntentsBitField.Flags[intent as keyof typeof IntentsBitField.Flags]),
    partials: free.config.bot.partials.map((partial: string) => Partials[partial as keyof typeof Partials])
});

/** Listeners */
import { ready } from "@listeners/ready";
import { guildMemberAdd } from "@listeners/guildMemberAdd";

client.on("clientReady", (c: Client) => ready(c));
client.on("guildMemberAdd", (member: GuildMember) => guildMemberAdd(member));

client.login(free.env.DISCORD_TOKEN);