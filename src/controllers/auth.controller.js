import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const userSaved = await new User({
      username,
      email,
      password: passwordHash,
    }).save();
    const token = await createAccessToken({ id: userSaved._id });
    // Envio de token en el body
    /* res.json({ token }); */
    // Envio de token en cookie
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = (req, res) => res.send("login");
