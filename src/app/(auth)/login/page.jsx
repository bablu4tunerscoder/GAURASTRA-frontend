"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "@/components/GoogleAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "@/store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth);

  /* 🔘 login mode */
  const [loginType, setLoginType] = useState("email"); // email | mobile

  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // 🔐 Email / Mobile validation based on mode
    if (loginType === "email") {
      if (!emailRegex.test(form.emailOrPhone)) {
        newErrors.emailOrPhone = "Enter a valid email address";
      }
    } else {
      if (!phoneRegex.test(form.emailOrPhone)) {
        newErrors.emailOrPhone = "Enter a valid 10-digit mobile number";
      }
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 5–10 characters and include 1 special character";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Login successful");
      router.push("/profile");
    } catch (err) {
      toast.error(err);
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

        {/* 🔘 LOGIN TYPE TOGGLE */}
        <div className="flex mb-6 rounded-lg overflow-hidden border border-white/30">
          <button
            type="button"
            onClick={() => {
              setLoginType("email");
              setForm({ emailOrPhone: "", password: "" });
              setErrors({});
            }}
            className={`flex-1 py-2 font-medium ${
              loginType === "email"
                ? "bg-[#9C0131]"
                : "bg-transparent"
            }`}
          >
            Email Login
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginType("mobile");
              setForm({ emailOrPhone: "", password: "" });
              setErrors({});
            }}
            className={`flex-1 py-2 font-medium ${
              loginType === "mobile"
                ? "bg-[#9C0131]"
                : "bg-transparent"
            }`}
          >
            Mobile Login
          </button>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>

          {/* EMAIL / PHONE INPUT */}
          <div>
            <label className="text-lg block mb-1">
              {loginType === "email" ? "Email" : "Mobile Number"}
            </label>

            <input
              type={loginType === "email" ? "email" : "tel"}
              name="emailOrPhone"
              value={form.emailOrPhone}
              onChange={handleChange}
              placeholder={
                loginType === "email"
                  ? "example@gmail.com"
                  : "9876543210"
              }
              maxLength={loginType === "mobile" ? 10 : undefined}
              className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 outline-none placeholder-white text-xl"
            />

            {errors.emailOrPhone && (
              <p className="text-yellow-300 text-sm mt-1">
                {errors.emailOrPhone}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-lg block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 outline-none placeholder-white text-xl pr-12"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-80"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>

            {errors.password && (
              <p className="text-yellow-300 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <Link
            href="/forgot-password-request"
            className="text-sm opacity-90 underline"
          >
            Forgot Password?
          </Link>

          {/* BUTTON */}
          <button
            disabled={status === "loading"}
            className="w-full bg-[#9C0131] rounded-lg py-3 font-medium disabled:opacity-60"
          >
            {status === "loading" ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* SERVER ERROR */}
        {error && (
          <p className="text-red-400 text-sm text-center mt-3">
            {error}
          </p>
        )}

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6 text-sm opacity-80">
          <span className="flex-1 h-px bg-white/30"></span>
          OR
          <span className="flex-1 h-px bg-white/30"></span>
        </div>

        <GoogleAuth />

        {/* FOOTER */}
        <p className="text-center text-sm mt-4 opacity-90">
          Don’t have an account?{" "}
          <Link href="/signin" className="font-semibold underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
