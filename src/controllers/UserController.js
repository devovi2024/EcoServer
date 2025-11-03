const {
  UserOTPService,
  VerifyOTPService,
  LogoutService,
  CreateUserService,
  UpdateUserProfileService,
  ReadUserProfileService,
} = require("../services/UserServices");

// Send OTP
exports.UserOTP = async (req, res) => {
  const result = await UserOTPService(req);
  res.status(200).json(result);
};

// Verify OTP
exports.UserVerifyLogin = async (req, res) => {
  try {
    const result = await VerifyOTPService(req);
    if (result.status === "success") {
      const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", result.token, cookieOptions);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Controller error",
      error: error.message,
    });
  }
};

// Logout
exports.UserLogout = async (req, res) => {
  const result = await LogoutService(res);
  res.status(200).json(result);
};

// Register / Create Profile
exports.UserCreate = async (req, res) => {
  const result = await CreateUserService(req);
  res.status(201).json(result);
};

// Update Profile
exports.UserUpdateProfile = async (req, res) => {
  const result = await UpdateUserProfileService(req);
  res.status(200).json(result);
};

// Read Profile
exports.UserReadProfile = async (req, res) => {
  const result = await ReadUserProfileService(req);
  res.status(200).json(result);
};
