import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id, role) => {
  
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role);


    res.status(200).json({ email, token, role: user.role, _id: user._id });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
export const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id, user.role);


    res.status(200).json({ email, token, role: user.role, _id: user._id });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};