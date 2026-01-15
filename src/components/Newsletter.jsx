"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SendHorizontal } from "lucide-react";
import axiosInstance from "@/helpers/axiosinstance";

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* =========================
     SUBMIT HANDLER (SAME LOGIC)
  ========================== */
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/newsletter/subscribe",
        data
      );

      toast.success(res.data.message || "Subscribed successfully");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Subscription failed"
      );
    }
  };

  return (
    <div className="md:px-16 py-10 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#A89B91] px-4 md:px-12 py-8 md:py-10">
        {/* Decorative circles */}
        <span className="absolute -left-14 top-2 w-32 h-32 rounded-full bg-orange-300 opacity-70" />
        <span className="absolute right-1/4 -bottom-16 w-48 h-48 rounded-full bg-orange-300 opacity-60" />
        <span className="absolute -right-6 -top-5 w-20 h-20 rounded-full bg-orange-300 opacity-60" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between md:gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-4xl font-serif font-semibold text-white">
              Get More Discount up to 40%
            </h2>
            <p className="text-sm md:text-base text-white/90 my-2">
              Save more buy more
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full md:w-auto items-center gap-3"
          >
            <input
              type="email"
              placeholder="Your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Enter a valid email",
                },
              })}
              className="flex-1 md:w-96 bg-gray-50 rounded-lg px-5 py-3 text-sm md:text-base outline-none text-gray-700 placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[#0B1B36] px-5 py-3 text-white hover:bg-[#152a4d] transition"
            >
              <SendHorizontal />
            </button>
          </form>
        </div>

        {/* ERROR */}
        {errors.email && (
          <p className="mt-2 text-sm text-red-200">
            {errors.email.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
