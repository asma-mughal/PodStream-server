import express from 'express';
import { SignIn, SignUp } from '../controllers/UserController.js';
const router = express.Router()


router.post('/login', SignIn)
router.post('/register', SignUp)



export default router;