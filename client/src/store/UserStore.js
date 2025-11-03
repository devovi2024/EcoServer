import { getEmail, setEmail, deleteEmail, unauthorized, successAlert, failAlert } from "../utility/Helper";
import axios from "axios";
import { create } from "zustand";

const UserStore = create((set, get) => ({

  // Login state
  isLogin: !!localStorage.getItem("token"),

  // Login form
  LoginFormValue: { email: "" },
  LoginFormOnChange: (name, value) =>
    set((state) => ({ LoginFormValue: { ...state.LoginFormValue, [name]: value } })),

  // OTP form
  OTPFormValue: { otp: "" },
  OTPFormOnChange: (name, value) =>
    set((state) => ({ OTPFormValue: { ...state.OTPFormValue, [name]: value } })),

  // Profile form
  ProfileForm: {},
  ProfileFormChange: (name, value) =>
    set((state) => ({ ProfileForm: { ...state.ProfileForm, [name]: value } })),

  isFormSubmit: false,

  //  OTP Request
  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    try {
      const res = await axios.get(`/api/UserOTP/${email}`);
      if (res.data.status === "success") {
        setEmail(email);
        successAlert("OTP Sent Successfully");
        set({ isFormSubmit: false });
        return true;
      }
      failAlert(res.data.message);
      set({ isFormSubmit: false });
      return false;
    } catch (error) {
      failAlert("OTP Sending Failed");
      set({ isFormSubmit: false });
      return false;
    }
  },

  //  Verify OTP Login
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    try {
      const email = getEmail();
      const res = await axios.get(`/api/UserVerifyLogin/${email}/${otp}`);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        successAlert("Login Successful");
        set({ isLogin: true, isFormSubmit: false });
        return true;
      }
      failAlert("Invalid OTP");
      set({ isFormSubmit: false });
      return false;
    } catch (error) {
      failAlert("Login Failed");
      set({ isFormSubmit: false });
      return false;
    }
  },

  //  Logout
  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    try {
      await axios.get("/api/UserLogout", {
        headers: { token: localStorage.getItem("token") },
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      deleteEmail();
      successAlert("Logout Successful");
      set({ isLogin: false, isFormSubmit: false });
    }
  },

  //  Profile Read
  ProfileDetails: null,
  ProfileDetailsReq: async () => {
    set({ isFormSubmit: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) return failAlert("User not logged in");

      const res = await axios.get("/api/UserReadProfile", {
        headers: { token },
      });

      if (res.data.status === "success" && res.data.data) {
        set({ ProfileDetails: res.data.data, ProfileForm: res.data.data });
      } else {
        set({ ProfileDetails: {}, ProfileForm: {} });
      }
    } catch (error) {
      if (error.response?.status === 401) unauthorized(401);
      console.log(error);
    } finally {
      set({ isFormSubmit: false });
    }
  },

  //  Profile Save
  ProfileSaveRequest: async () => {
    set({ isFormSubmit: true });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        failAlert("User not identified, login again");
        set({ isFormSubmit: false });
        return false;
      }

      const res = await axios.post("/api/UserUpdateProfile", get().ProfileForm, {
        headers: { token },
      });

      if (res.data.status === "success") {
        successAlert("Profile Updated Successfully");
        set({ ProfileDetails: get().ProfileForm });
        return true;
      }
      failAlert(res.data.message || "Profile Update Failed");
      return false;
    } catch (error) {
      failAlert(error.response?.data?.message || "Error Updating Profile");
      console.log(error);
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },
}));

export default UserStore;
