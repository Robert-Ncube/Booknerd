import Admin from "../models/AdminUserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const createAdminUser = async (req, res) => {
    try {
        const adminUser = req.body;

        // Check required fields (use ||)
        if (!adminUser.username ||!adminUser.email ||!adminUser.password) {
            return res.status(400).json({
                success: false,
                error: "Missing required fields: Username and Password!",
            });
        }

        // Check if username already exists
        const existingUser = await Admin.findOne({ email: adminUser.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Admin user already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server error: Could not create admin user",
            details: error.message,
        });
    }
}