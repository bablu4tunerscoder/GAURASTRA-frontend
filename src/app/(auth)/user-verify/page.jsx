"use client";

import React, { useEffect, useState } from "react";
import { OtpInput } from 'reactjs-otp-input';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helpers/axiosinstance";

export default function UserVerify() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 

  
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ================= VERIFY OTP ================= */
const handleVerifyOtp = async () => {
  if (otp.length !== 4) {
    return toast.error("Please enter 4 digit OTP");
  }

  const token = sessionStorage.getItem("token");

  if (!token) {
    toast.error("Session expired. Please Register again.");
    // return router.push("/signin");
  }

  setLoading(true);
  try {
    const res = await axiosInstance.post(
      "/api/auth/verify-user",
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Email verified successfully 🎉");

    sessionStorage.removeItem("token");
  
    setTimeout(() => {
      router.push("/login");
    },500)
  } catch (error) {
    toast.error(error?.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};

const handleChange = (otp) => setOtp(otp);
  /* ================= RESEND OTP ================= */
 const handleResendOtp = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    toast.error("Session expired. Please login again.");
    // return router.push("/signin");
  }

  setResendLoading(true);
  try {
    await axiosInstance.post(
      "/api/auth/resend-otp",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("OTP resent to your email");
    setTimeLeft(60);
    setOtp("");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to resend OTP");
  } finally {
    setResendLoading(false);
  }
};

  return (
    <div className='min-h-screen flex items-center justify-center bg-[url("/assets/bg.svg")] bg-cover'>
      <div className="max-w-md w-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-white">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">OTP Verification</h1>
          <p className="opacity-90">
            Please enter the otp (One Time Password) sent to your registered email to complete your verification
          </p>
        </div>

        {/* OTP INPUT */}
        <div className="flex justify-center mb-4">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            isInputNum
            shouldAutoFocus
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
            inputStyle={{
              width: "50px",
              height: "56px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.5)",
              background: "transparent",
              color: "#fff",
              fontSize: "22px",
              fontWeight: "600",
              textAlign: "center",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            focusStyle={{
              border: "2px solid #fff",
              boxShadow: "0 0 0 3px rgba(255,255,255,0.25)",
            }}
          />

        </div>

        {/* TIMER */}
        <div className="text-center text-sm mb-4 opacity-90">
          {timeLeft > 0 ? (
            <p>
              Resend OTP in{" "}
              <span className="font-semibold">{timeLeft}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="underline font-semibold"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className="w-full bg-[#9C0131] py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
