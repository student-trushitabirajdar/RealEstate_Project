import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export type JwtTokens = {
    accessToken: string;
    refreshToken: string;
};

export function signTokens(userId: string, tokenVersion: number = 0, role?: "BROKER" | "CHANNEL_PARTNER"): JwtTokens {
    const accessToken = jwt.sign({ sub: userId, type: "access", tv: tokenVersion, role }, env.jwtAccessSecret, {
        expiresIn: env.jwtAccessExpiresIn,
    });
    const refreshToken = jwt.sign({ sub: userId, type: "refresh", tv: tokenVersion }, env.jwtRefreshSecret, {
        expiresIn: env.jwtRefreshExpiresIn,
    });
    return { accessToken, refreshToken };
}

export function verifyAccess(token: string) {
    return jwt.verify(token, env.jwtAccessSecret);
}

export function verifyRefresh(token: string) {
    return jwt.verify(token, env.jwtRefreshSecret);
}


