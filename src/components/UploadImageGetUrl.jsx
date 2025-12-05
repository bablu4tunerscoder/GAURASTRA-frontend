"use client";
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImageUp, Copy } from "lucide-react";
import toast from "react-hot-toast";

const UploadImageGetUrl = () => {
  const { register, watch } = useForm();
  const [imageUrl, setImageUrl] = useState("");

  const selectedFile = watch("image");

  // Upload only when file changes
  useEffect(() => {
    const file = selectedFile?.[0];
    if (!file) return;

    const upload = async () => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axiosInstanceWithOfflineToken.post(
          "/api/offline/upload-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setImageUrl(res.data?.data?.url || "");
      } catch (err) {
        console.log(err);
      }
    };

    upload();
  }, [selectedFile]);

  const copyToClipboard = () => {
    if (imageUrl) navigator.clipboard.writeText(imageUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="p-4 w-full  flex gap-4 bg-gray-200 mb-2 rounded">

      {/* Upload Box */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-500">Upload Image</span>

        <label className="border-2 border-dashed border-gray-400 rounded py-1.5
                          flex flex-col items-center justify-center cursor-pointer 
                          hover:border-black transition relative">
          <ImageUp className="w-5 h-5 text-gray-500 " />

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="hidden"
          />
        </label>
      </div>

      {/* URL Box */}
      <div className="flex min-w-lg flex-col gap-2">
        <span className="text-xs text-gray-500">Image URL</span>

        <div className="flex w-full items-center rounded overflow-hidden">
          <input
            type="text"
            readOnly
            value={imageUrl}
            placeholder="Upload image to get URL"
            className="flex-1 p-2 text-sm bg-gray-50 outline-none"
          />

          <button
            onClick={copyToClipboard}
            disabled={!imageUrl}
            className={`px-3 py-2 ${imageUrl ? "bg-black text-white cursor-grab" : "bg-gray-300 text-gray-600"} flex items-center gap-1`}
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageGetUrl;
