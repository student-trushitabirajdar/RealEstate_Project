import { Router } from "express";
import { authRateLimiter, requireAuth, optionalAuth } from "../../middleware/security";
import { signupHandler, loginHandler, logoutHandler, meHandler, refreshHandler } from "./controller";

export const authRouter = Router();

authRouter.post("/signup", authRateLimiter, signupHandler);
authRouter.post("/login", authRateLimiter, loginHandler);
authRouter.post("/logout", optionalAuth, logoutHandler);
authRouter.get("/me", requireAuth, meHandler);
authRouter.post("/refresh", refreshHandler);

// health check for integration testing
authRouter.get("/health", (_req, res) => res.json({ ok: true }));


