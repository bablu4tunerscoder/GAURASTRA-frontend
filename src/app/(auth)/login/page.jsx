"use client";
import React, { useEffect } from "react";
import { Lock, LogIn, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../Redux/Slices/userSlice";

export default function Login() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {

    try {
      // dispatch(loginUser(data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     // navigate("/OnlineAdmin");
  //   }
  // }, [user, navigate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">

      {/* Background Image */}
      <img
        src="/assets/EthnicSection011.webp"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main Container (glassy effect) */}
      <div className="
                relative z-10 w-full max-w-5xl flex flex-col lg:flex-row 
                items-center justify-between 
                bg-white bg-opacity-10 
                rounded-2xl shadow-2xl overflow-hidden 
                border border-white border-opacity-20 
                m-6 
                backdrop-filter backdrop-blur
            ">

        {/* Left Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8 lg:p-12 text-center space-y-6">
          <img
            src="/assets/loginbg.webp"
            alt="Logo"
            width="140"
            height="140"
            className="rounded-full"
          />

          <h2 className="text-3xl font-semibold">Welcome Back 👋</h2>

          <p className="text-gray-300 text-sm max-w-xs">
            Login to continue your journey with{" "}
            <span className="text-blue-400 font-semibold">Gaurastra</span>.
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="
                    w-full lg:w-1/2 p-8 lg:p-12 
                    bg-black bg-opacity-40 
                    backdrop-filter backdrop-blur
                ">
          <h2 className="text-3xl font-semibold text-center mb-2">
            Login to Your Account
          </h2>

          <p className="text-center text-gray-300 mb-6">
            Access your account to explore handcrafted streetwear.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Phone / Email */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Phone Number or Email
              </label>

              <div className="
                                flex items-center 
                                bg-white bg-opacity-10 
                                border border-gray-500 
                                rounded-lg px-3 py-2
                            ">
                <Phone size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your phone number or email"
                  className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
                  {...register("emailOrPhone", {
                    required: "Phone number or email is required",
                  })}
                />
              </div>

              {errors.emailOrPhone && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.emailOrPhone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>

              <div className="
                                flex items-center 
                                bg-white bg-opacity-10 
                                border border-gray-500 
                                rounded-lg px-3 py-2
                            ">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                                w-full mt-4 flex items-center justify-center gap-2 
                                bg-blue-600 hover:bg-blue-700 
                                text-white py-3 rounded-lg text-lg font-medium transition
                            "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : (
                <>
                  <LogIn size={18} /> Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
