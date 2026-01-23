import { config as dot } from "dotenv";
dot();

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";
import color from "colors/safe";
import free from "@free";

let prisma: PrismaClient;

export async function saveCache() {
    if (!prisma) {
        prisma = new PrismaClient({
            adapter: new PrismaPg({
                connectionString: free.env["DATABASE_URL"] || ""
            })
        });
        free.prisma = prisma;
        console.log(color.yellow("[Free] ") +  color.bgGreen("SUCCESS") + " Prisma client cache saved.");
        return prisma;
    }
}

export { prisma };