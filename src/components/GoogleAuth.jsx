"use client";
import React, { useEffect, useState } from "react";
import { Lock, LogIn, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../Redux/Slices/userSlice";

export default function GoogleAuth() {
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
     <button className="w-full bg-white text-black rounded-lg py-3 flex items-center justify-center gap-2">
          <Image width={20} height={20} src="/assets/google.png" alt="google" className="w-5 h-5" />
          Continue with Google
      </button>
  );
}
