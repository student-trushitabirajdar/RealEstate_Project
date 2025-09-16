import { Router } from "express";
import { authRouter } from "./modules/auth/routes";

export const appRouter = Router();

appRouter.use("/auth", authRouter);


