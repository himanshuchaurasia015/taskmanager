import bcrypt from "bcrypt";
import user from "../models/userSchema.js";
import { generateToken } from "../utils/jwt.js";

export const userSignup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "all fields required",
      });
    }
    const isExist = await user.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({
        msg: "user already exists",
      });
    }
    password = await bcrypt.hash(password, 10);
    let newUser = await user.create({ name, email, password });

    if (newUser) {
      const token = generateToken({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: true,
      });
      res.user = newUser;
      return res.status(200).json({
        msg: "user created",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } else {
      return res.status(400).json({
        msg: "unexpected error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "all fields required",
      });
    }
    let isExist = await user.findOne({ email: email });
    if (!isExist) {
      return res.status(404).json({
        msg: "user not exist",
      });
    }
    delete isExist.password;
    delete isExist.__v;
    const isMatch = await bcrypt.compare(password, isExist.password);
    if (isMatch) {
      const token = generateToken({
        _id: isExist._id,
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
      });
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
      res.user = {
        _id: isExist._id,
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
      };
      return res.status(200).json({
        msg: "login success",
        user: res.user,
      });
    }

    return res.status(400).json({
      msg: "wrong password",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msg: "something went wrong",
    });
  }
};

export const userSignOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({
      msg: "logout success",
    });
  } catch (err) {
    return res.status(400).json({
      msg: err,
    });
  }
};

export const updateUser = (req, res) => {};

export const getUserDetail = async (req, res) => {
  try {
    const id = req.params.userId;
    const details = await user.findById(id, "name email role");
    res.status(200).json({
      details,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = (req, res) => {};
