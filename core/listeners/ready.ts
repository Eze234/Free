import {
    Collection,
    Client,
    ActivityType,
} from "discord.js";
import colors from "colors/safe";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

export const ready = async (client: Client) => {
    presence(client);
    hello(client);
};

function hello(client: Client) {
    console.log(colors.blue(`
███████╗███████╗███████╗
██╔════╝╚══███╔╝██╔════╝
█████╗    ███╔╝ █████╗  
██╔══╝   ███╔╝  ██╔══╝  
███████╗███████╗███████╗
╚══════╝╚══════╝╚══════╝
`));
    console.log(`[${colors.yellow(`${client?.user?.tag ?? 'Eze#0234'}`)}] ${colors.bgGreen("SUCCESS")} Hi wacho`);
}

function presence(client: Client) {
    const activities = [
        {
            type: ActivityType.Custom,
            state: "🚭",
            name: "Fafnir"
        }
    ]
    client.user?.setPresence({ activities, status: "idle" });
}