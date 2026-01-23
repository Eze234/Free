import config from "@assets/config.json";
import * as utils from "@assets/utils";
import { config as dot } from "dotenv";
dot();

let free = {
    github: 'https://github.com/Eze234/Free',
    discord: 'https://discord.gg/MAgkYcBGWN',
    config: config,
    utils: utils,
    env: process.env
}

export default free;