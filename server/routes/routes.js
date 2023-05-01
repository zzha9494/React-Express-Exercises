import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/api/data", controller.getFive);
router.post("/api/data", controller.getFive);

export default router;
