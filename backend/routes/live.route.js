import express from 'express';
import { creatRoom } from '../controller/live.controller.js';

const router = express();


router.post('/create-room',creatRoom);

export default router;