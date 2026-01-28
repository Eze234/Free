import { config as dot } from 'dotenv';
import type { PrismaClient } from '../../generated/prisma/client';

dot();

import config from '@assets/config.json';
import * as utils from '@assets/utils';

const free = {
	github: 'https://github.com/Eze234/Free',
	discord: 'https://discord.gg/MAgkYcBGWN',
	config: config,
	utils: utils,
	env: process.env,
	prisma: null as PrismaClient | null
};

export default free;
