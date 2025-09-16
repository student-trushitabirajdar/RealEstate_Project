import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../user/repository";
import { signTokens } from "./jwt";

const signupSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(128),
    name: z.string().min(1).max(100).optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export async function signupHandler(req: Request, res: Response) {
    const parse = signupSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ message: "Invalid input", errors: parse.error.flatten() });
    }
    const { email, password, name } = parse.data;
    const existing = await findUserByEmail(email);
    if (existing) {
        return res.status(409).json({ message: "Email already in use" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({ email, passwordHash, name });
    const tokens = signTokens(user.id);
    setAuthCookies(res, tokens);
    return res.status(201).json({ user: sanitizeUser(user), tokens });
}

export async function loginHandler(req: Request, res: Response) {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const { email, password } = parse.data;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const tokens = signTokens(user.id);
    setAuthCookies(res, tokens);
    return res.json({ user: sanitizeUser(user), tokens });
}

function sanitizeUser(user: any) {
    const { passwordHash, ...rest } = user;
    return rest;
}

function setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: 15 * 60 * 1000,
        path: "/",
    });
    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: isProd ? "strict" : "lax",
        secure: isProd,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
}


