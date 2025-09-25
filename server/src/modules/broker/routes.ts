import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/security";
import { createBrokerHandler, listMyBrokersHandler } from "./controller";

export const brokerRouter = Router();

// Both BROKER and CHANNEL_PARTNER can access
brokerRouter.post("/", requireAuth, requireRole(["BROKER", "CHANNEL_PARTNER"]), createBrokerHandler);
brokerRouter.get("/mine", requireAuth, requireRole(["BROKER", "CHANNEL_PARTNER"]), listMyBrokersHandler);


