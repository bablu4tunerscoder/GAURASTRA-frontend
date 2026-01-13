"use client";
import React, { useEffect, useState } from "react";
import { Lock, LogIn, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../Redux/Slices/userSlice";

export default function Login() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
 const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const [errors, setErrors] = useState({});
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const onSubmit = async (data) => {

  //   try {
  //     // dispatch(loginUser(data));
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Login failed");
  //   }
  // };

 
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
 
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
  const handleSubmit = (e) => {
    e.preventDefault();
 
    let newErrors = {};
 
    // EMAIL VALIDATION
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
 
    // PASSWORD VALIDATION
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be 5–10 characters and include at least 1 special character";
    }
 
    // CONFIRM PASSWORD VALIDATION
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
 
    // SET ERRORS
    setErrors(newErrors);
 
    // STOP if errors exist
    if (Object.keys(newErrors).length > 0) return;
 
    console.log(form);

    
 
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // useEffect(() => {
  //   if (user) {
  //     // navigate("/OnlineAdmin");
  //   }
  // }, [user, navigate]);

  return (
     <div className='bg-[url("/assets/bg.svg")] sm:bg-cover lg:bg-contain w-full bg-no-repeat bg-center min-h-screen relative'>
      <div className="max-w-lg w-full m-auto h-fit absolute inset-0 bg-white/20 backdrop-blur-lg text-white border border-dashed border-white/30 p-6 rounded-2xl">
        {/* header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">Welcome</h1>
          <p className="text-md opacity-90">Sign in with Email</p>
        </div>
        {/* form starts */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* EMAIL */}
          <div>
            <label className="text-lg block mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 outline-none placeholder-white text-xl"
            />
            {errors.email && (
              <p className="text-yellow-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>
 
          {/* PASSWORD */}
          <div>
            <label className="text-lg block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="@#*%"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 outline-none placeholder-white text-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 cursor-pointer">
                <Image width={20} height={20} src="/assets/eye.png" alt="eye-image" />
              </span>
            </div>
            {errors.password && (
              <p className="text-yellow-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>
 
          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-lg block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="@#*%"
                className="w-full rounded-lg bg-transparent border border-white/40 px-4 py-3.5 outline-none placeholder-white text-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 cursor-pointer">
                <Image width={20} height={20} src="/assets/eye.png" alt="eye-image" />
              </span>
            </div>
 
            {errors.confirmPassword && (
              <p className="text-yellow-300 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
 
          {/* BUTTON */}
          <button className="w-full bg-[#9C0131] hover:bg-red-800 rounded-lg py-3 font-medium mt-2">
            Sign in
          </button>
        </form>
        {/* lower division */}
        <div className="flex items-center gap-3 my-6 text-sm opacity-80 w-xs mx-auto">
          <span className="flex-1 h-px bg-white/30"></span>
          OR
          <span className="flex-1 h-px bg-white/30"></span>
        </div>
 
        {/* GOOGLE BUTTON */}
        <button className="w-full bg-white text-black rounded-lg py-3 flex items-center justify-center gap-2">
          <Image width={20} height={20} src="/assets/google.png" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>
 
        {/* FOOTER */}
        <p className="text-center text-sm mt-4 opacity-90">
          Don’t have account?{" "}
          <span className="font-semibold cursor-pointer">Register Now</span>
        </p>
      </div>
    </div>
  );
}
