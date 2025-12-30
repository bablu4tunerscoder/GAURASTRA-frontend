"use client";

import { auth, googleAuthProvider } from "@/helpers/fireBaseConfig";
import { googleAuthUser, registerUser } from "@/store/slices/authSlice";
import { signInWithPopup } from "firebase/auth";
import { LogIn, Mail, Phone, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function SignupPage() {

  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Submit signup form
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      toast.error(error?.message || "Signup failed");
    }
  };

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      toast.success("Signup successful!");
      router.back();
    }
  }, [user]);

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const token = await result.user.getIdToken();

      dispatch(googleAuthUser(token))
        .unwrap()
        .then(() => {
          toast.success("Google signup successful!");
          router.push("/");
        })
        .catch(() => toast.error("Error during Google signup."));
    } catch (error) {
      toast.error("Google signup failed.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">

      <Image
        src="/assets/EthnicSection011.jpg"
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 m-6">

        {/* LEFT SECTION */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-10 text-center space-y-6">
          <Image
            src="/assets/loginbg.webp"
            alt="Logo"
            width={140}
            height={140}
            className="rounded-full"
            priority
          />
          <h2 className="text-3xl font-semibold">Create Your Account 🎉</h2>
          <p className="text-gray-300 text-sm max-w-xs">
            Join <span className="text-blue-400 font-semibold">Gaurastra</span> and start your fashion journey!
          </p>

          {/* GOOGLE SIGNUP */}
          <button
            type="button"
            className="flex items-center justify-center w-full sm:w-3/4 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
            onClick={handleGoogleSignup}
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

        {/* RIGHT SECTION (FORM) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-black/40 backdrop-blur-md">
          <h2 className="text-3xl font-semibold text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-300 mb-6">
            Fill the details to get started.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white/10 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <div className="flex items-center bg-white/10 border border-gray-500 rounded-lg px-3 py-2">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full text-white outline-none placeholder-gray-400"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Phone Number</label>
              <div className="flex items-center bg-white/10 border border-gray-500 rounded-lg px-3 py-2">
                <Phone size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="bg-transparent w-full text-white outline-none placeholder-gray-400"
                  {...register("phone", {
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Minimum 10 digits" },
                  })}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>
              <div className="flex items-center bg-white/10 border border-gray-500 rounded-lg px-3 py-2">
                <Lock size={18} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="bg-transparent w-full text-white outline-none placeholder-gray-400"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-lg font-medium transition"
            >
              {isSubmitting ? "Creating Account..." : <>Create Account <LogIn size={18} /></>}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
