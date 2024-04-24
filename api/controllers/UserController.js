import { User } from "../models/User.js";
import JWT from "jsonwebtoken";
const customHash = (str) => {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }

  return hash;
};

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
      userName: name,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    return res.status(200).json({
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
    const { email, password } = req.body;
    if (!email || !password) {
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
      expiresIn: "4d",
    });

    return res.status(201).json({
      message: "User LoggedIn successfully",
      user: {
        _id: foundUser?._id,
        userName: foundUser?.userName,
        email: foundUser?.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const ResetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Bad Request", success: false });
    }
    const foundUser = await User.findOne({ email }).lean();
    if (foundUser.length < 0) {
      return res
        .status(400)
        .json({ message: "Email Doesn't exists", success: false });
    }
    const hashPassword = customHash(password);
    const updateUser = await User.findByIdAndUpdate(
      foundUser?._id,
      { password: hashPassword },
      { lean: true }
    );
    return res.status(201).json({
      message: "Password updated successfully",
      user: {
        name: updateUser?.userName,
      },
    });
  } catch (error) {
    console.error("Error updating Password:", error);
  return res
    .status(500)
    .json({ message: "Internal Server Error", success: false });
}
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().populate({
      path: "podcasts",
      populate: {
          path: "creator",
          select: "name img",
      }
  }
  ).populate(
      {
          path: "favorits",
          populate: {
              path: "creator",
              select: "name img",
          }
      }
  );
  res.status(200).json(user);
  } catch (error) {
    console.error("Error Fetching Users:", error);
  return res
    .status(500)
    .json({ message: "Internal Server Error", success: false });
}
};
