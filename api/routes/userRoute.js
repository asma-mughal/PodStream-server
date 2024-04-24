import express from 'express';
import { ResetPassword, SignIn, SignUp } from '../controllers/UserController.js';
const router = express.Router()


router.post('/login', SignIn)
router.post('/register', SignUp)
router.put('/forgetPass', ResetPassword)



export default router;