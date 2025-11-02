import { getEmail, setEmail, deleteEmail } from "../utility/helper";
import axios from "axios";
import { create } from "zustand";

const UserStore = create((set) => ({
  LoginFormValue: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormValue: { ...state.LoginFormValue, [name]: value },
    }));
  },

  isFormSubmit: false,

  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    try {
      const res = await axios.get(`/api/UserOTP/${email}`);
      if (res.data.status === "success") {
        setEmail(email);
        set({ isFormSubmit: false });
        return true;
      }
      set({ isFormSubmit: false });
      return false;
    } catch (error) {
      console.error("UserOTPRequest Error:", error);
      set({ isFormSubmit: false });
      return false;
    }
  },

  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    try {
      const email = getEmail();
      const res = await axios.get(`/api/UserVerifyLogin/${email}/${otp}`);
      set({ isFormSubmit: false });
      return res.data.status === "success";
    } catch (error) {
      console.error("VerifyLoginRequest Error:", error);
      set({ isFormSubmit: false });
      return false;
    }
  },
}));

export default UserStore;
