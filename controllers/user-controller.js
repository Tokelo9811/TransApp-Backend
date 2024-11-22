import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while fetching users", error: err });
  }
  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

export const Signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error checking for existing user", error: err });
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login instead" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: "Error saving user", error: err });
  }

  return res.status(201).json({ message: "User created successfully", user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error checking for existing user", error: err });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found with this email" });
  }

  let isPasswordCorrect;
  try {
    isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error comparing passwords", error: err });
  }

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  return res.status(200).json({ message: "Login successful" });
};
