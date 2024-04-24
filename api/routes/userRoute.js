import express from 'express';
import { ResetPassword, SignIn, SignUp, getAllUsers } from '../controllers/UserController.js';
const router = express.Router()


router.post('/login', SignIn)
router.post('/register', SignUp)
router.put('/forgetPass', ResetPassword)

router.get('/', getAllUsers)



export default router;