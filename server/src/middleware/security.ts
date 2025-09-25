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

export type AuthRequest = Request & { userId?: string; role?: "BROKER" | "CHANNEL_PARTNER" };

export function optionalAuth(req: AuthRequest, _res: Response, next: NextFunction) {
    const token = extractAccessToken(req);
    if (!token) return next();
    try {
        const decoded = verifyAccess(token) as jwt.JwtPayload & { role?: string };
        if (decoded && typeof decoded.sub === "string") {
            req.userId = decoded.sub;
            if (decoded.role === "BROKER" || decoded.role === "CHANNEL_PARTNER") {
                req.role = decoded.role;
            }
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
        const decoded = verifyAccess(token) as jwt.JwtPayload & { role?: string };
        if (!decoded || typeof decoded.sub !== "string") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.sub;
        if (decoded.role === "BROKER" || decoded.role === "CHANNEL_PARTNER") {
            req.role = decoded.role;
        }
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export function requireRole(allowed: Array<"BROKER" | "CHANNEL_PARTNER">) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        if (!req.role) return res.status(403).json({ message: "Forbidden" });
        if (!allowed.includes(req.role)) return res.status(403).json({ message: "Forbidden" });
        return next();
    };
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


