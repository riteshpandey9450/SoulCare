import express from "express";
import { generateFeedback } from "../controller/feedback.controller.js";

const router = express.Router();

router.post('/create', generateFeedback);

export default router;