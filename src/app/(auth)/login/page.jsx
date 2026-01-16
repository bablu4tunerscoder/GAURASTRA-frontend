"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/helpers/axiosinstance";
import GoogleAuth from "@/components/GoogleAuth";
import { loginSuccess } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useCartSync } from "@/hooks/useCartSync"; // ✅ ADD THIS IMPORT

export default function Login() {
  const [loginType, setLoginType] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useCartSync(); // ✅ ADD THIS LINE - That's it!

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  /* ============================
     SUBMIT HANDLER
  ============================ */
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", data);

      const { user, token } = res.data.data;

      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      toast.success("Login successful");
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[url("/assets/bg.svg")] sm:bg-cover lg:bg-contain w-full bg-no-repeat bg-center min-h-screen relative'>
      <div className="max-w-lg w-full m-auto h-fit absolute inset-0 bg-white/20 backdrop-blur-lg text-white border border-dashed border-white/30 p-6 rounded-2xl">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold">Welcome</h1>
          <p className="text-md opacity-90">Login to your account</p>
        </div>

        {/* LOGIN TYPE */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-white/30">
          <button
            type="button"
            onClick={() => {
              setLoginType("email");
              reset();
            }}
            className={`flex-1 py-2 ${loginType === "email" ? "bg-[#9C0131]" : ""
              }`}
          >
            Email Login
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginType("mobile");
              reset();
            }}
            className={`flex-1 py-2 ${loginType === "mobile" ? "bg-[#9C0131]" : ""
              }`}
          >
            Mobile Login
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL / MOBILE */}
          <div>
            <label className="text-lg block mb-1">
              {loginType === "email" ? "Email" : "Mobile Number"}
            </label>

            <input
              type={loginType === "email" ? "email" : "tel"}
              placeholder={
                loginType === "email" ? "example@gmail.com" : "9876543210"
              }
              className="
                w-full
                rounded-lg
                bg-transparent
                border border-white/40
                px-4 py-3.5
                outline-none
                text-xl
                text-white
                placeholder-white
                autofill:text-white
              "
              {...register("emailOrPhone", {
                required: "This field is required",
                validate: (value) =>
                  loginType === "email"
                    ? emailRegex.test(value) || "Invalid email"
                    : phoneRegex.test(value) || "Invalid mobile number",
              })}
            />

            {errors.emailOrPhone && (
              <p className="text-yellow-300 text-sm mt-1">
                {errors.emailOrPhone.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-lg block mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="
                      w-full
                      rounded-lg
                      bg-transparent
                      border border-white/40
                      px-4 py-3.5
                      outline-none
                      text-xl
                      text-white
                      placeholder-white
                      pr-12
                    "
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
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

            {errors.password && (
              <p className="text-yellow-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            href="/forgot-password-request"
            className="text-sm underline opacity-90"
          >
            Forgot Password?
          </Link>

          <button
            disabled={loading}
            className="w-full bg-[#9C0131] rounded-lg py-3 font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6 text-sm opacity-80">
          <span className="flex-1 h-px bg-white/30"></span>
          OR
          <span className="flex-1 h-px bg-white/30"></span>
        </div>

        <GoogleAuth />

        <p className="text-center text-sm mt-4 opacity-90">
          Don't have an account?{" "}
          <Link href="/signin" className="underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}