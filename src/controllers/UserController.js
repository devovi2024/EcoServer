const {
  UserOTPService,
  VerifyOTPService,
  LogoutService,
  CreateUserService,
  UpdateUserProfileService,
  ReadUserProfileService,
} = require("../services/UserServices");

exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req);
  res.status(200).json(result);
};

exports.UserVerifyLogin = async (req, res) => {
  let result = await VerifyOTPService(req);
  if (result.status === "success") {
    let cookieOptions = {
      expires: new Date(Date.now() + 30*24*60*60*1000),
      httpOnly: true,
    };
    res.cookie("token", result.token, cookieOptions);
  }
  res.status(200).json(result);
};

exports.UserLogout = async (req, res) => {
  let result = await LogoutService(res);
  res.status(200).json(result);
};

exports.UserRegister = async (req, res) => {
  let result = await CreateUserService(req);
  res.status(201).json(result);
};

exports.UserUpdateProfile = async (req, res) => {
  let result = await UpdateUserProfileService(req);
  res.status(200).json(result);
};

exports.UserReadProfile = async (req, res) => {
  let result = await ReadUserProfileService(req);
  res.status(200).json(result);
};
