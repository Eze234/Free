import { config as dot } from 'dotenv';

dot();

import free from '@free';
import { PrismaPg } from '@prisma/adapter-pg';
import color from 'colors/safe';
import { PrismaClient } from '../../generated/prisma/client';

let prisma: PrismaClient;

export async function saveCache() {
	if (!prisma) {
		prisma = new PrismaClient({
			adapter: new PrismaPg({
				connectionString: free.env.DATABASE_URL!
			})
		});
		free.prisma = prisma;
		console.log(
			color.yellow('[Free] ') +
				color.bgGreen('SUCCESS') +
				' Prisma client cache saved.'
		);
		return prisma;
	}
}

export { prisma };
