"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axiosInstance from "@/helpers/axiosinstance";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/helpers/fireBaseConfig";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function GoogleAuth() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // 🔐 Firebase Google Popup
      const result = await signInWithPopup(auth, googleAuthProvider);

      const token_from_google = await result.user.getIdToken();

      const res = await axiosInstance.post("/api/auth/google-auth", {
        token: token_from_google,
      });

      toast.success("Login successful 🎉");


      const { user, token } = res.data.data;

      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      window.location.href = "/";

    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full bg-white text-black rounded-lg py-3 flex items-center justify-center gap-2 font-medium disabled:opacity-60"
    >
      <Image
        width={20}
        height={20}
        src="/assets/google.png"
        alt="google"
      />
      {loading ? "Process in..." : "Continue with Google"}
    </button>
  );
}
