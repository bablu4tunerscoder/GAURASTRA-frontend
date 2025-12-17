"use client";
// import axiosInstance from "@/Helper/axiosinstance";
import { auth, googleAuthProvider } from "@/Helper/fireBaseConfig";
import { googleAuthUser, loginUser } from "@/Redux/Slices/authSlice";
import { signInWithPopup } from "firebase/auth";
import { Lock, LogIn, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      dispatch(loginUser(data));
      // router.back();

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };
  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user]);


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const token = await result.user.getIdToken();

      dispatch(googleAuthUser(token))
        .unwrap()
        .then(() => {
          toast.success("Google login successful!");
          router.back();
        })
        .catch((err) => {
          console.error("Google Auth Error:", err);
          toast.error("Error during Google login.");
        });
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/EthnicSection011.jpg"
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Layout Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 m-6">

        {/* Left Section (Logo + Google Login) */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8 lg:p-12 text-center space-y-6">
          <Image
            src="/assets/loginbg.webp"
            alt="Gaurastra Logo"
            width={140}
            height={140}
            className="rounded-full"
            priority
          />
          <h2 className="text-3xl font-semibold">Welcome Back 👋</h2>
          <p className="text-gray-300 text-sm max-w-xs">
            Login to continue your journey with <span className="text-blue-400 font-semibold">Gaurastra</span>.
          </p>

          {/* Google Login */}
          <button
            type="button"
            className="flex items-center justify-center w-full sm:w-3/4 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
            onClick={handleGoogleLogin}
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Icon"
              width={22}
              height={22}
              className="mr-2"
            />
            Continue with Google
          </button>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-black/40 backdrop-blur-md">
          <h2 className="text-3xl font-semibold text-center mb-2">Login to Your Account</h2>
          <p className="text-center text-gray-300 mb-6">
            Access your account to explore handcrafted streetwear.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Phone Number or Email */}
            <div>
              <label htmlFor="phone" className="block text-sm mb-1 text-gray-300">Phone Number or Email</label>
              <div className="flex items-center bg-white/10 border border-gray-500 rounded-lg px-3 py-2 focus-within:border-blue-400">
                <Phone size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number or email"
                  className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
                  {...register("emailOrPhone", {
                    required: "Phone number or email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.emailOrPhone && <p className="text-red-400 text-sm mt-1">{errors.emailOrPhone.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1 text-gray-300">Password</label>
              <div className="flex items-center bg-white/10 border border-gray-500 rounded-lg px-3 py-2 focus-within:border-blue-400">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-transparent w-full text-white placeholder-gray-400 outline-none"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : <><LogIn size={18} /> Login</>}
            </button>

            {errors.login && <p className="text-red-400 text-center mt-4">{errors.login.message}</p>}
          </form>

          {/* Link to Signup */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
