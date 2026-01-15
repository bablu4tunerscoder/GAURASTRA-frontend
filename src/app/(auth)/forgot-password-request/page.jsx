"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/helpers/axiosinstance";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/auth/reset-password-request", {
        email: data.email,
      });

      toast.success("Password reset link sent to your email 📧");
      
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[url("/assets/bg.svg")] bg-cover'>
      <div className="max-w-md w-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 text-white">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="opacity-90">
            Enter your registered email to reset password
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-lg mb-1 block">E-mail</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-yellow-300 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[#9C0131] py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm mt-4 opacity-90">
          Remember your password?{" "}
          <Link href="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
