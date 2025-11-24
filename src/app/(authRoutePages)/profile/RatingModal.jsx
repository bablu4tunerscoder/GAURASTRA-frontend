"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function RatingModal({ data, close }) {
  const [rating, setRating] = useState({ stars: 0, comment: "" });

  const submit = () => {
    if (!rating.stars) return alert("Select rating");
    // alert("Rating submitted!");
    console.log(data)
    // close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">

        <h3 className="text-xl font-semibold">Rate This Product</h3>

        {/* Stars */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={32}
              onClick={() => setRating((r) => ({ ...r, stars: n }))}
              className={rating.stars >= n ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>

        {/* Comment */}
        <textarea
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black"
          rows={4}
          value={rating.comment}
          onChange={(e) => setRating({ ...rating, comment: e.target.value })}
          placeholder="Share your experience..."
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={close} className="flex-1 border py-2 rounded-lg">Cancel</button>
          <button onClick={submit} className="flex-1 bg-black text-white py-2 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
