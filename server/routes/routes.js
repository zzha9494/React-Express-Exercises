import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/data", controller.getFive);
router.post("/data", controller.getFive);

router.get("/getPhone", controller.getPhone);

export default router;
