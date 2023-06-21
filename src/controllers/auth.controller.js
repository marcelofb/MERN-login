import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ errors: ["Email already exists"] });
    const passwordHash = await bcryptjs.hash(password, 10);
    const savedUser = await new User({
      username,
      email,
      password: passwordHash,
    }).save();
    const token = await createAccessToken({ id: savedUser._id });
    // Envio de token en el body
    /* res.json({ token }); */
    // Envio de token en cookie
    res.cookie("token", token);
    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ errors: ["User not found"] });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ errors: ["Invalid credentials"] });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.userId);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const userFound = await User.findById(decoded.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
