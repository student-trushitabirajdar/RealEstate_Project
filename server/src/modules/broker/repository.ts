import { prisma } from "../../lib/prisma";

export type CreateBrokerInput = {
    firmName: string;
    firstName: string;
    lastName: string;
    emailId: string;
    dateOfBirth: string;
    whatsapp?: string | null;
    alternate?: string | null;
    foreign?: string | null;
    address: string;
    location: string;
    city: string;
    state: string;
    postalCode: string;
    date?: string | null;
    time?: string | null;
    message?: string | null;
    createdById: string;
};

export async function createBroker(data: CreateBrokerInput) {
    return prisma.broker.create({ data });
}

export async function listBrokersByUser(userId: string) {
    return prisma.broker.findMany({ where: { createdById: userId }, orderBy: { createdAt: "desc" } });
}


