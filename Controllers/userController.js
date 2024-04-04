const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const sendToken = require("../utils/sendAuthToken");
const jwt = require("jsonwebtoken");

//signup Route
const signUp = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, answer } = req.body;

    if (
      [name, email, password, phone, address, role, answer].some(
        (fields) => fields?.trim === ""
      )
    ) {
      return res.status(400).json({
        message: "All the fields are required!!",
      });
    }

    const availableUser = await User.findOne({ email });

    if (availableUser) {
      return res.status(400).json({
        message: "User already exists!!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully!",
      User: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during registration of user!!",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password!!",
      });
    }
    const isUserAvailable = await User.findOne({ email });

    if (!isUserAvailable) {
      return res.status(404).json({
        message: "User not registered!!",
      });
    }

    const isPasswordCorrect = await comparePassword(
      password,
      isUserAvailable.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or Password!!",
      });
    }

    sendToken(isUserAvailable, 200, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error logging in the user!!",
    });
  }
};

const forgotpassword = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    if (!email || !answer || !newpassword) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required!!",
      });
    }

    //const userAvailable = await User.findOne({ email, answer });
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.answer !== answer) {
      return res.status(400).json({
        success: false,
        message: "Incorrect security answer!",
      });
    }

    const newhashedPassword = await hashPassword(newpassword);
    await User.findByIdAndUpdate(user._id, {
      password: newhashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const test = (req, res) => {
  res.json({
    message: "Test passed!!",
  });
};
module.exports = {
  signUp,
  login,
  test,
  forgotpassword,
};
