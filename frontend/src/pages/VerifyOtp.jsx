import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async () => {
    if (!email) {
      alert("No email found. Please go back and sign up again.");
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        alert("OTP verified! Signup completed.");
        navigate("/login");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Something went wrong during verification.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b1b1f] text-white px-4">
      <div className="bg-[#2d2d32] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#ffccd5]">
          Verify OTP
        </h1>

        <input
          type="text"
          placeholder="Enter OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border border-[#800f2f] rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9d0208]"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-[#9d0208] hover:bg-[#6a040f] text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
