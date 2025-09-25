import { Router } from "express";
import { authRouter } from "./modules/auth/routes";
import { brokerRouter } from "./modules/broker/routes";
import { buildingRouter } from "./modules/building/routes";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/brokers", brokerRouter);
appRouter.use("/buildings", buildingRouter);


