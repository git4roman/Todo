import User from "../models/user.js";
import hashPassword from "../utils/passwordUtils.js";
import bcrypt from "bcryptjs";
import createJWT from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    // Check if the user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate a JWT token
    const token = createJWT({ userId: user._id });
    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ msg: "User successfully created", user });
  } catch (error) {
    console.error("Registration Error:", error); // Logs error for easier debugging
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "production", // Use secure cookies only in production (when HTTPS is enabled)
    });

    // Respond with a success message and the token
    res.json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // Send the token to the client
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "User logged out" });
};
