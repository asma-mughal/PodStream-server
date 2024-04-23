
import { customHash } from "../helpers/authHelper.js";
import { User } from "../models/User.js";


export const SignUp = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body; 
        if (!userName || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "Bad Request", success: false });
        }
        const userEmail = await User.find({ email }).lean();
        if (userEmail.length > 0) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }
        const hashPassword = customHash(password)
        
        const newUser = new User({ userName, email, password:hashPassword, phone, address });
        const savedUser = await newUser.save();
        return res.status(200).json({ message: "User created successfully", success: true, user: savedUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}