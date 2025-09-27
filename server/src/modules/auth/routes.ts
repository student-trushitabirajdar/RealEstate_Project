import { Router } from "express";
import { authRateLimiter } from "../../middleware/security";
import { signupHandler, loginHandler, logoutHandler, meHandler } from "./controller";

export const authRouter = Router();

authRouter.post("/signup", authRateLimiter, signupHandler);
authRouter.post("/login", authRateLimiter, loginHandler);
authRouter.post("/logout", logoutHandler);
authRouter.get("/me", meHandler);

// health check for integration testing
authRouter.get("/health", (_req, res) => res.json({ ok: true }));


