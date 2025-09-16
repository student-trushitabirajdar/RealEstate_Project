import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, defaultValue?: string): string {
    const value = process.env[name] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required env var ${name}`);
    }
    return value;
}

export const env = {
    nodeEnv: getEnv("NODE_ENV", "development"),
    port: Number(getEnv("PORT", "4000")),
    databaseUrl: getEnv("DATABASE_URL"),
    jwtAccessSecret: getEnv("JWT_ACCESS_SECRET"),
    jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET"),
    jwtAccessExpiresIn: getEnv("JWT_ACCESS_EXPIRES_IN", "15m"),
    jwtRefreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN", "7d"),
    corsOrigins: (process.env.CORS_ORIGINS ?? "").split(",").filter(Boolean),
};


