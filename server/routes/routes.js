import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/getSoldOutSoon", controller.getSoldOutSoon);
router.get("/getBestSellers", controller.getBestSellers);

// test
router.post("/data", controller.getSoldOutSoon);
router.get("/getPhone", controller.getPhone);
// test

export default router;
