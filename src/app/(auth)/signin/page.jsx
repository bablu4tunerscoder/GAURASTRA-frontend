"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import axiosInstance from "@/helpers/axiosinstance";
import GoogleAuth from "@/components/GoogleAuth";

import { useRouter } from "next/navigation";

export default function SignIn() {


  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const onSubmit = async (data) => {
    setLoading(true);

    try {

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role", "Customer"); 

    console.log(formData);

    const res = await axiosInstance.post(
      "/api/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

     sessionStorage.setItem("token", res.data.token);
     
      toast.success("Registration successful, Verify your email");
      setTimeout(() => {
        // router.push("/user-verify");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[url("/assets/bg.svg")]  sm:bg-cover lg:bg-contain  relative'>
      <div className="max-w-lg w-full m-auto  inset-0 bg-white/20 backdrop-blur-lg text-white border border-dashed border-white/30 p-6 rounded-2xl">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="opacity-90">
            Your details are 100% safe and securely protected
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* DIVIDER */}

          <GoogleAuth />

          <div className="flex items-center gap-3 my-6 opacity-80">
            <span className="flex-1 h-px bg-white/30"></span>
            OR
            <span className="flex-1 h-px bg-white/30"></span>
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-lg mb-1 block">Your Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
            {errors.name && (
              <p className="text-yellow-300 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

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
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-yellow-300 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div>
            <label className="text-lg mb-1 block">Phone Number</label>
            <input
              type="tel"
              placeholder="9876543210"
              className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: phoneRegex,
                  message: "Enter valid 10 digit mobile number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-yellow-300 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="text-lg mb-1 block">Set Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none pr-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
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

            {/* HELPER TEXT */}
            <p className="text-xs text-white/70 mt-1">
              Minimum 8 characters required
            </p>

            {errors.password && (
              <p className="text-yellow-300 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-lg mb-1 block">Confirm Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 text-xl outline-none pr-12"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />

              <span
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="text-yellow-300 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* TERMS */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              {...register("acceptTerms", {
                required: "You must accept terms & privacy policy",
              })}
            />
            <p>
              I accept the{" "}
              <Link href="/terms" className="underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {errors.acceptTerms && (
            <p className="text-yellow-300 text-sm">
              {errors.acceptTerms.message}
            </p>
          )}

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[#9C0131] py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Signin in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 opacity-90">
          I have an account?{" "}
          <Link href="/login" className="underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
