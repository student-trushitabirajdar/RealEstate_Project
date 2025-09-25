import { prisma } from "../../lib/prisma";

export type CreateBuildingInput = {
    societyName: string;
    flatNo: string;
    firstName: string;
    lastName: string;
    emailId: string;
    whatsapp?: string | null;
    alternate?: string | null;
    international?: string | null;
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

export async function createBuildingData(data: CreateBuildingInput) {
    return prisma.buildingData.create({ data });
}

export async function listBuildingsByUser(userId: string) {
    return prisma.buildingData.findMany({ where: { createdById: userId }, orderBy: { createdAt: "desc" } });
}


