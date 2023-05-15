import express from "express";
import controller from "../controllers/controller.js";

const router = express.Router();

router.get("/searchByTitle", controller.searchByTitle)

router.get("/getPhone", controller.getPhone);

router.get("/getSoldOutSoon", controller.getSoldOutSoon);
router.get("/getBestSellers", controller.getBestSellers);

router.post("/login", controller.login);
router.post("/signup", controller.signup);

export default router;
