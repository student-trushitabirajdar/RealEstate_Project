import { Request, Response } from "express";
import { z } from "zod";
import type { AuthRequest } from "../../middleware/security";
import { createBroker, listBrokersByUser } from "./repository";

const brokerSchema = z.object({
    firmName: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    emailId: z.string().email(),
    dateOfBirth: z.string().min(1),
    whatsapp: z.string().optional().nullable(),
    alternate: z.string().optional().nullable(),
    foreign: z.string().optional().nullable(),
    address: z.string().min(1),
    location: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    date: z.string().optional().nullable(),
    time: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
});

export async function createBrokerHandler(req: Request, res: Response) {
    const { userId } = req as AuthRequest;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const parse = brokerSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ message: "Invalid input", errors: parse.error.flatten() });
    }
    const created = await createBroker({ ...parse.data, createdById: userId });
    return res.status(201).json({ broker: created });
}

export async function listMyBrokersHandler(req: Request, res: Response) {
    const { userId } = req as AuthRequest;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const items = await listBrokersByUser(userId);
    return res.json({ brokers: items });
}


