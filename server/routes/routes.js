import express from "express";
import controller from "../controllers/controller.js";
import session from 'express-session'
const router = express.Router();

router.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    cookie:('name','value',{
        maxAge:5*60*1000,
        secure:false
    })
}))

router.get("/data", controller.getFive);
router.post("/data", controller.getFive);

router.get("/getPhone", controller.getPhone);

router.get('/checklogin',controller.checklogin);
router.post('/login',controller.checkpswd);

export default router;
