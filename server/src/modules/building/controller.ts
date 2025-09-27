import { Request, Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../../middleware/security";
import { createBuildingData, listBuildingsByUser } from "./repository";

const buildingSchema = z.object({
    societyName: z.string().min(1),
    flatNo: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    emailId: z.string().email(),
    whatsapp: z.string().optional().nullable(),
    alternate: z.string().optional().nullable(),
    international: z.string().optional().nullable(),
    address: z.string().min(1),
    location: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    date: z.string().optional().nullable(),
    time: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
});

export async function createBuildingHandler(req: Request, res: Response) {
    const { userId } = req as AuthRequest;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const parse = buildingSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ message: "Invalid input", errors: parse.error.flatten() });
    }
    const created = await createBuildingData({ ...parse.data, createdById: userId });
    return res.status(201).json({ buildingData: created });
}

export async function listMyBuildingsHandler(req: Request, res: Response) {
    const { userId } = req as AuthRequest;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const items = await listBuildingsByUser(userId);
    return res.json({ buildingData: items });
}


