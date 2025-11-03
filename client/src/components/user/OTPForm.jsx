import React from "react";
import { useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore";
import SubmitButton from "../layout/SubmitButton";
import { failAlert, successAlert } from "../../utility/Helper";

const OTPForm = () => {
  const navigate = useNavigate();
  const { OTPFormValue, OTPFormOnChange, VerifyLoginRequest } = UserStore();

  const onSubmit = async () => {
    if (!OTPFormValue.otp) {
      failAlert("Enter OTP");
      return;
    }

    const res = await VerifyLoginRequest(OTPFormValue.otp);
    if (res) {
      successAlert("Login Successful");
      navigate("/");
    } else {
      failAlert("Invalid OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        value={OTPFormValue.otp}
        onChange={(e) => OTPFormOnChange("otp", e.target.value)}
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter OTP"
      />
      <SubmitButton
        onClick={onSubmit}
        submit={false}
        className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        text="Verify OTP"
      />
    </div>
  );
};

export default OTPForm;
