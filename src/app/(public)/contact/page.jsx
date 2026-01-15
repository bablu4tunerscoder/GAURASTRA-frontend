"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "@/helpers/axiosinstance";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ============================
      SUBMIT HANDLER
  ============================ */
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axiosInstance.post("/api/contact/contact-us", data);

      toast.success("Your message has been sent successfully");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <Image
        src="/assets/productPageBanner.png"
        alt="Category Banner"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="min-h-screen px-4 md:px-16 py-16">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 mb-8">
            Have a question? We’re here to help.
          </p>
        </div>

        <div className="flex flex-col md:flex-row py-10 gap-8">
          {/* Left: Form */}
          <div className="max-w-md w-full">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:ring-primary"
              />
              {errors.name && (
                <p className="text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:ring-primary"
              />
              {errors.email && (
                <p className="text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}

              {/* Subject */}
              <input
                type="text"
                placeholder="Subject"
                {...register("subject", {
                  required: "Subject is required",
                })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:ring-primary"
              />
              {errors.subject && (
                <p className="text-xs text-red-500">
                  {errors.subject.message}
                </p>
              )}

              {/* Message */}
              <textarea
                rows={4}
                placeholder="Message"
                {...register("message", {
                  required: "Message is required",
                })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:ring focus:ring-primary"
              />
              {errors.message && (
                <p className="text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-700 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right: Map Illustration */}
          <div className="relative md:block hidden w-full h-[400px]">
            <Image
              src="/assets/world-map.png"
              alt="World map"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />

            <div className="absolute right-32 top-44 flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-md">
              <span className="text-xl">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">
                India
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
