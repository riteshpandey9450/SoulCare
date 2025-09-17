import express from "express";
import { bookSession } from "../controller/session.controller.js";
import { studentMiddleware } from "../middlewares/user.middleware.js";


const router = express.Router();

router.post('/create-room',studentMiddleware, bookSession);


export default router;