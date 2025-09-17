import express from 'express';
import upload from '../utils/upload.js';
import { addCounsellor, getMe, login, logout, signup,editProfile, } from '../controller/user.controller.js';
import { adminMiddleware, commonMiddleware, studentMiddleware } from '../middlewares/user.middleware.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/addcounsellor',upload.single('image'),adminMiddleware, addCounsellor);
router.post('/login', login);
router.post('/logout',commonMiddleware, logout);
router.get('/getme',commonMiddleware, getMe);
router.put("/update",upload.single('image'), studentMiddleware, editProfile);


export default router;