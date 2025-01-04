const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const checkUserFn = (email) => {
  return User.findOne({ email });
};

// register
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const checkUser = await checkUserFn(email);

  if (checkUser) {
    return res.status(400).json({
      success: false,
      message: "User Already exists with the same email! Please try again",
    });
  }

  // if user do not exist create new one with hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create and save the new user in one step
  const newUser = await User.create({
    email,
    userName,
    password: hashPassword,
  });

  return res.status(200).json({
    success: true,
    message: "Register successfully!",
  });
});

// login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await checkUserFn(email);

  if (!checkUser) {
    return res.status(400).json({
      success: false,
      message: "User doesn't exists! Please register first",
    });
  }

  // if user exist , check password match or not

  const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

  if (!checkPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Incorrect password. Please try again!",
    });
  }

  const token = jwt.sign(
    {
      id: checkUser._id,
      email: checkUser.email,
      userName: checkUser.userName,
      role: checkUser.role,
    },
    "JWT_SECRET_KEY",
    { expiresIn: "60m" }
  );

  res.cookie("token", token, { httpOnly: true, secure: false }).json({
    success: true,
    message: "Logged In  successfully!",
    user: {
      id: checkUser._id,
      email: checkUser.email,
      userName: checkUser.userName,
      role: checkUser.role,
    },
  });
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Loggout successfully!",
  });
});

// auth middleware
const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  const decoded = jwt.verify(token, "JWT_SECRET_KEY");
  req.user = decoded;
  next();
});

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
