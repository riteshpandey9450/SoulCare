import express from 'express';
import { addCounsellor, signup } from '../controller/user.controller.js';
import upload from '../utils/upload.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/addcounsellor', upload.single('image'), addCounsellor);




export default router;