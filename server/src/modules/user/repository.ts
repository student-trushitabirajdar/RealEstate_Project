import { prisma } from "../../lib/prisma";

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(params: { email: string; passwordHash: string; name?: string | null }) {
    return prisma.user.create({ data: params });
}


