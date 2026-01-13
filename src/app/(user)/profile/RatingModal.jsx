"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import axiosInstance from "@/helpers/axiosinstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function RatingModal({ data, close }) {
  const [rating, setRating] = useState({ rating_value: 0, comment_text: "" });
  const { _id } = useSelector((state) => state?.auth?.user)


  const submit = async () => {
    if (!rating.rating_value) return toast.error("Select rating");
    // alert("Rating submitted!");
    try {
      const response = await axiosInstance.post("/api/rating/add", { ...rating, ...data, user_id: _id });
      if (response.success == false) return toast.error(response.message)
      toast.success("Rating submitted!");
      close();
    }
    catch (error) {
      toast.error(error?.response?.data?.message || "Rating submission failed");
    }

  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">

        <h3 className="text-xl font-semibold">Rate This Product</h3>

        {/* Stars */}
        <div className="flex gap-2 cursor-pointer">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={32}
              onClick={() => setRating((r) => ({ ...r, rating_value: n }))}
              className={rating.rating_value >= n ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>

        {/* comment_text */}
        <textarea
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black"
          rows={4}
          value={rating.comment_text}
          onChange={(e) => setRating({ ...rating, comment_text: e.target.value })}
          placeholder="Share your experience..."
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={close}
            className="flex-1 border py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="flex-1 bg-black text-white py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
}
