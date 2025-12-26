"use client";
import { axiosInstanceWithOfflineToken } from "@/helper/axiosinstance";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ImageUp, Copy, X } from "lucide-react";
import toast from "react-hot-toast";

const UploadImageGetUrl = ({ onImageUploaded = () => { }, handleRemoveUrl = () => { } }) => {
  const {
    register,
    watch,
    resetField,
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef(null);
  const selectedFile = watch("image");

  const handleCancel = () => {
    handleRemoveUrl(imageUrl);
    setImageUrl("");
    resetField("image");

    if (fileRef.current) {
      fileRef.current.value = "";
    }

  };

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
        toast.error(err.response?.data?.message || "Image upload failed");
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
    <div className={
      imageUrl
        ? "grid md:grid-cols-[1fr_250px_1fr] grid-cols-1 gap-2 mb-2"
        : "grid md:grid-cols-2 grid-cols-1 gap-2 mb-2"
    }>
      {/* Upload Box */}
      <label id="image-upload" className="border-dashed border-2 flex justify-center items-center flex-col bg-white gri gap-2 p-3 rounded-md cursor-pointer">

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
        <ImageUp />

        <span className="cursor-pointer text-sm">
          Upload Image
        </span>
      </label>
      {/* img preview */}
      {
        imageUrl && (
          <div className="relative">
            <img src={imageUrl} className="object-cover border-dashed border-2 rounded-md overflow-hidden" alt="" />
            <X onClick={handleCancel} className="absolute hover:bg-red-700 bg-red-500 text-white top-2 right-2 cursor-pointer" />
          </div>
        )
      }

      {/* URL Box */}
      <div className="border-dashed bg-white border-2 flex items-center justify-between gap-2 p-3 rounded-md">
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