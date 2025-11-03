import React from "react";
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore";
import SubmitButton from "../layout/SubmitButton";
import Validation from "../../utility/Validation";
import { failAlert } from "../../utility/Helper";

const LoginForm = () => {
  const navigate = useNavigate();
  const { LoginFormValue, LoginFormOnChange, UserOTPRequest } = UserStore();

  const onFormSubmit = async () => {
    if (!Validation.isEmail(LoginFormValue.email)) {
      failAlert("Enter a valid email address");
      return;
    }

    const res = await UserOTPRequest(LoginFormValue.email);
    if (res) {
      navigate("/otp");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login with Email</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={LoginFormValue.email}
        onChange={(e) => LoginFormOnChange("email", e.target.value)}
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SubmitButton
        onClick={onFormSubmit}
        submit={false}
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        text="Send OTP"
      />
    </div>
  );
};

export default LoginForm;
