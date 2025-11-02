const { EmailSend } = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const { EncodeToken } = require("../utility/TokenHelper");

// Send OTP
const UserOTPService = async (req) => {
  try {
    const email = req.params.email;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await EmailSend(email, `Your OTP code is: ${code}`, "Your OTP Code");
    await UserModel.updateOne(
      { email },
      { $set: { otp: code } },
      { upsert: true }
    );

    return { status: "success", message: "6-digit OTP sent successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to send OTP", error: error.message };
  }
};

// Verify OTP
const VerifyOTPService = async (req) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    if (!email || !otp) return { status: "fail", message: "Email or OTP missing" };

    const user = await UserModel.findOne({ email, otp }).select("_id");
    if (!user) return { status: "fail", message: "Invalid OTP or Email" };

    const token = EncodeToken(email, user._id.toString());
    await UserModel.updateOne({ email }, { $set: { otp: "0" } });

    return { status: "success", message: "OTP verified successfully", token };
  } catch (error) {
    return { status: "error", message: "Error verifying OTP", error: error.message };
  }
};

// Logout
const LogoutService = async (res) => {
  try {
    res.clearCookie("token");
    return { status: "success", message: "User logged out successfully" };
  } catch (error) {
    return { status: "error", message: "Error during logout", error: error.message };
  }
};

// Create Profile
const CreateUserService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    reqBody.userID = user_id;

    await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "User profile created successfully" };
  } catch (error) {
    return { status: "error", message: "Failed to create user profile", error: error.message };
  }
};

// Update Profile
const UpdateUserProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;

    const result = await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody });
    if (result.matchedCount === 0) return { status: "fail", message: "Profile not found" };

    return { status: "success", message: "User profile updated successfully" };
  } catch (error) {
    return { status: "error", message: "Error updating user profile", error: error.message };
  }
};

// Read Profile
const ReadUserProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const result = await ProfileModel.findOne({ userID: user_id });
    if (!result) return { status: "fail", message: "User profile not found" };

    return { status: "success", message: "User profile fetched successfully", data: result };
  } catch (error) {
    return { status: "error", message: "Error fetching user profile", error: error.message };
  }
};

module.exports = {
  UserOTPService,
  VerifyOTPService,
  LogoutService,
  CreateUserService,
  UpdateUserProfileService,
  ReadUserProfileService,
};
