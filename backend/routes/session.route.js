import express from "express";
import { bookSession, getCounsellorSessions, getStudentSessions } from "../controller/session.controller.js";


const router = express.Router();

router.post('/create-room', bookSession);
router.get("/counsellor", getCounsellorSessions);
router.get("/student", getStudentSessions);


export default router;