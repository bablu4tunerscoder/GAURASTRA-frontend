"use client";
import { axiosInstanceWithOfflineToken } from "@/Helper/axiosinstance";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ImageUp, Copy } from "lucide-react";
import toast from "react-hot-toast";

const UploadImageGetUrl = ({ onImageUploaded }) => {
  const {
    register,
    watch,
    resetField,
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef(null);
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

        if (res.data?.data?.url) {
          onImageUploaded(res.data?.data?.url);
        }

        // Clear the file input after successful upload
        resetField("image");
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      } catch (err) {
        console.log(err);
        // Also clear on error so user can retry with same file
        resetField("image");
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    };

    upload();
  }, [selectedFile, onImageUploaded, resetField]);

  const copyToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Upload Box */}
      <div className="border-dashed border-2 flex items-center justify-center flex-col gap-2 p-3 rounded-md cursor-pointer">
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          ref={(e) => {
            register("image").ref(e);
            fileRef.current = e;
          }}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <ImageUp />
        </label>
        <label htmlFor="image-upload" className="cursor-pointer text-sm">
          Upload Image
        </label>
      </div>

      {/* URL Box */}
      <div className="border-dashed border-2 flex items-center justify-between gap-2 p-3 rounded-md">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Image URL</p>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">
            {imageUrl || "No image uploaded"}
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          disabled={!imageUrl}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UploadImageGetUrl;