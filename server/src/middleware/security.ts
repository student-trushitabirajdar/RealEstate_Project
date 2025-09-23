import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyAccess } from "../modules/auth/jwt";

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

export function buildCors() {
    if (env.corsOrigins.length === 0) {
        return cors({ origin: (origin, cb) => cb(null, true), credentials: true });
    }
    return cors({ origin: env.corsOrigins, credentials: true });
}

export type AuthRequest = Request & { userId?: string };

export function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
    const token = extractAccessToken(req);
    if (!token) return next();
    try {
        const decoded = verifyAccess(token) as jwt.JwtPayload;
        if (decoded && typeof decoded.sub === "string") {
            req.userId = decoded.sub;
        }
    } catch (_) {
        // ignore invalid token on optional auth
    }
    return next();
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const token = extractAccessToken(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = verifyAccess(token) as jwt.JwtPayload;
        if (!decoded || typeof decoded.sub !== "string") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.sub;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

function extractAccessToken(req: Request): string | null {
    // Prefer HTTP-only cookie; fallback to Authorization header
    const cookieToken = (req as any).cookies?.accessToken;
    if (typeof cookieToken === "string" && cookieToken.length > 0) return cookieToken;
    const authHeader = req.get("authorization") || req.get("Authorization");
    if (!authHeader) return null;
    const [scheme, token] = authHeader.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token) return null;
    return token;
}


