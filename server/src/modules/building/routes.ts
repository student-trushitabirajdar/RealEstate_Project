import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/security";
import { createBuildingHandler, listMyBuildingsHandler } from "./controller";

export const buildingRouter = Router();

// Both BROKER and CHANNEL_PARTNER can access
buildingRouter.post("/", requireAuth, requireRole(["BROKER", "CHANNEL_PARTNER"]), createBuildingHandler);
buildingRouter.get("/mine", requireAuth, requireRole(["BROKER", "CHANNEL_PARTNER"]), listMyBuildingsHandler);


