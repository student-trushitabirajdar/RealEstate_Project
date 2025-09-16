import { Router } from "express";
import { authRateLimiter } from "../../middleware/security";
import { signupHandler, loginHandler } from "./controller";

export const authRouter = Router();

authRouter.post("/signup", authRateLimiter, signupHandler);
authRouter.post("/login", authRateLimiter, loginHandler);

// health check for integration testing
authRouter.get("/health", (_req, res) => res.json({ ok: true }));


