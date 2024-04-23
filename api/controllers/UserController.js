
import { User } from "../models/User.js";
import JWT from 'jsonwebtoken';
const customHash = (str) => {
    let hash = 0;

    if (str.length === 0) {
        return hash;
    }

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32-bit integer
    }

    return hash;
}

export const SignUp = async (req, res) => {

  try {
    const { userName, email, password, phone, address } = req.body;
    if (!userName || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "Bad Request", success: false });
    }
    const userEmail = await User.find({ email }).lean();
    if (userEmail.length > 0) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashPassword = customHash(password);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phone,
      address,
    });
    const savedUser = await newUser.save();
    return res
      .status(200)
      .json({
        message: "User created successfully",
        success: true,
        user: savedUser,
      });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const SignIn = async (req, res) => {
    try {
      const {  email, password} = req.body;
      if ( !email || !password ) {
        return res.status(400).json({ message: "Bad Request", success: false });
      }
        const foundUser = await User.findOne({ email }).lean();
      if (foundUser.length < 0) {
        return res
          .status(400)
          .json({ message: "Email Doesn't exists", success: false });
      }
        const hashedUserInputPassword = customHash(password);
        if (foundUser?.password != hashedUserInputPassword) {
            return res.status(200).json({ message: "Password doesn't match" });
        }
        const token = JWT.sign({ _id: foundUser?.id }, "test", {
            expiresIn:"4d"
        })

        return res.status(201).json({
            message: "User LoggedIn successfully", user: {
              _id: foundUser?._id,
              name: foundUser?.userName,
              email: foundUser?.email,
              phone: foundUser?.phone,
              adddress: foundUser?.address,
      } , token });
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  };
