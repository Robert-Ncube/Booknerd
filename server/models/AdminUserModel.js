import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    Enum: ["Admin", "User"],
    default: "User",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
