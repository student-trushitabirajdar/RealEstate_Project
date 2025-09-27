import { prisma } from "../../lib/prisma";

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
}

export async function createUser(params: { email: string; passwordHash: string; name?: string | null; role?: "BROKER" | "CHANNEL_PARTNER" }) {
    return prisma.user.create({ data: params });
}

export async function findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
}

export async function incrementTokenVersion(id: string) {
    return prisma.user.update({ where: { id }, data: { tokenVersion: { increment: 1 } } });
}


