"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setImageUrl(res.data.url);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl text-center">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Upload Image to Cloudinary
      </h2>

      <div className="flex flex-col items-center gap-5">

        <label
          htmlFor="file-upload"
          className="cursor-pointer border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 w-full text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          {preview ? (
            <img
              src={preview}
              className="w-full h-48 object-contain rounded-lg"
              alt="Preview"
            />
          ) : (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4M13 8h8m0 0v8m0-8l-4 4m4-4l-4-4"
                />
              </svg>
              <p className="text-sm mt-2">Click to select an image</p>
            </div>
          )}
        </label>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full mt-2 px-4 py-2 rounded-xl font-semibold text-white transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {imageUrl && (
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
               Uploaded Image:
            </p>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="rounded-xl shadow-md mx-auto max-h-64 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
