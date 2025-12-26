"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/helper/axiosinstance";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(
        `/api/offline/user/login`,
        formData
      );

      if (data) {
        sessionStorage.setItem("offline_user", JSON.stringify(data.data));
        sessionStorage.setItem("offline_access_token", data.token);

        window.location.href = "/offline/billing";
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.msg || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8EEF7] to-[#DDE9F8]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center relative">

          {/* RADIAL BLUR GLOW */}
          <div
            className="
      absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      w-[420px] h-[420px] 
      rounded-full
      bg-[radial-gradient(circle,rgba(0,0,255,0.60)_0%,rgba(0,0,255,0.40)_40%,rgba(0,0,255,0)_75%)]
      blur-[100px]
      z-10
    "
          />

          {/* IMAGE */}
          <img
            src="/assets/login-illustration.png"
            alt="Fashion Tech"
            className="w-[380px] md:block hidden md:w-[480px] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>



        {/* RIGHT SIDE */}
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md p-8 space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-center text-blue-600">
              LOGIN
            </h2>
            <p className="text-gray-500 text-sm ">
              Access your dashboard and manage your fashion store with ease
            </p>

            {/* EMAIL */}
            <div className="">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center mt-1 bg-white  rounded-lg px-3 gap-2">
                <HiOutlineMail className="text-xl text-gray-500" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className="w-full p-3 bg-transparent outline-none text-black"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs ">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center mt-1 bg-white  rounded-lg px-3 gap-2">
                <RiLockPasswordLine className="text-xl text-gray-500" />

                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 bg-transparent outline-none text-black"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 text-xl"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs ">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all
                ${loading ? "bg-blue-400" : "bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90"}
              `}
            >
              {loading ? "Logging in..." : "Login Now"}
            </button>


          </form>
        </div>
      </div>
    </div>
  );
}
