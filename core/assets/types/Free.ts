import { config as dot } from "dotenv";
dot();

import config from "@assets/config.json";
import * as utils from "@assets/utils";

let free = {
    github: 'https://github.com/Eze234/Free',
    discord: 'https://discord.gg/MAgkYcBGWN',
    config: config,
    utils: utils,
    env: process.env,
    prisma: null as any
}

export default free;