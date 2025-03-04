import Admin from "../models/AdminUserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required!",
      });
    }

    // Check if the user already exists
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "Email already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user instance
    const newUser = new Admin({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Send the response
    return res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });
    }

    // Find the user by email
    const user = await Admin.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found!" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password!" });
    }

    // Generate and send a JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Logged in successfully.",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the JWT token cookie
    res
      .clearCookie("token", { httpOnly: true, secure: false })
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

export const deleteProfile = async (req, res) => {};

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Unauthorized!" });
    }

    // Verify token and handle expiration
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            error: "Token expired!",
            isTokenExpired: true, // Add custom flag for frontend
          });
        }
        return res
          .status(401)
          .json({ success: false, error: "Invalid token!" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error!" });
  }
};

export const isAuthenticated = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated.",
    user: req.user,
  });
};
