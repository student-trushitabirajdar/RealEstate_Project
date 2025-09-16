import rateLimit from "express-rate-limit";
import { env } from "../config/env";
import cors from "cors";

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


