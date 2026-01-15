"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axiosInstance from "@/helpers/axiosinstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import animationData from "@/lottiefiles/Success Check.json"; // apni lottie file ka path

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // ✅ token from query

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("newPassword");

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or expired token");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/reset-password", {
        token: token,
        newPassword: data.newPassword,
      });

      toast.success("Password reset successfully 🎉");
      setSuccess(true); // ✅ open success popup
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[url("/assets/bg.svg")] bg-cover'>
      
      {/* ================= RESET FORM ================= */}
      {!success && (
        <div className="max-w-md w-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-white">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="opacity-90">Set your new password below</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* NEW PASSWORD */}
            <div>
              <label className="text-lg mb-1 block">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none pr-12"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-yellow-300 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-lg mb-1 block">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-yellow-300 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-[#9C0131] py-3 rounded-lg font-medium disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm mt-4 opacity-90">
            Go back to{" "}
            <Link href="/login" className="underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      )}

      {/* ================= SUCCESS POPUP ================= */}
      {success && (
        <div className="max-w-md w-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-white text-center">

          <Lottie
            animationData={animationData}
            loop={false}
            className="mx-auto"
            style={{
              width: 180,
              height: 180,
              background: "transparent", // ✅ white bg fix
              mixBlendMode: "multiply",   // ✅ blends with bg
            }}
          />

          <h1 className="text-3xl font-bold mt-4">
            Password Updated 🎉
          </h1>
          <p className="opacity-90 mt-2">
            Your password has been reset successfully.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block w-full bg-[#9C0131] py-3 rounded-lg font-medium"
          >
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
}
