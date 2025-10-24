const {
  UserLoginService,
  VerifyUserService,
  UserLogoutService,
  CreateUserService,
  UpdateUserProfileService,
  ReadUserProfileService,
} = require("../services/UserServices");

// User login
exports.UserLogin = async (req, res) => {
  await UserLoginService(req);
  res.status(200).json({ status: "success", message: "User logged in successfully" });
};

// Verify user session or token
exports.UserVerifyLogin = async (req, res) => {
  await VerifyUserService(req);
  res.status(200).json({ status: "success", message: "User verified successfully" });
};

// User logout
exports.UserLogout = async (req, res) => {
  await UserLogoutService(req);
  res.status(200).json({ status: "success", message: "User logged out successfully" });
};

// User registration
exports.UserRegister = async (req, res) => {
  await CreateUserService(req);
  res.status(201).json({ status: "success", message: "User registered successfully" });
};

// Update user profile
exports.UserUpdateProfile = async (req, res) => {
  await UpdateUserProfileService(req);
  res.status(200).json({ status: "success", message: "User profile updated successfully" });
};

// Read user profile
exports.UserReadProfile = async (req, res) => {
  await ReadUserProfileService(req);
  res.status(200).json({ status: "success", message: "User profile fetched successfully" });
};
