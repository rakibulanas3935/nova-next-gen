"use client";

import { useState } from "react";
import Button from "@/app/components/shared/Button";
import RichTextEditor from "../../../component/RichTextEditor";
import axios from "axios";
import { toast } from "react-toastify";
import { useBlogContext } from "@/app/context/blogContext";
import { ImagePlus } from "lucide-react";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    blogImage: null, // raw file
    dateTime: "", // ✅ added
  });
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { setReload } = useBlogContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, blogImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.blogImage || !formData.dateTime) {
      toast.warn("Please fill all fields, upload an image and select date/time!");
      return;
    }

    try {
      setUploading(true);

      // 1️⃣ Upload the image first
      const imgData = new FormData();
      imgData.append("image", formData.blogImage);

      const { data } = await axios.post(
        "https://deep-sky-server.onrender.com/api/v1/all/upload-image",
        imgData
      );

      const imageUrl = data.url;

      // 2️⃣ Create the blog with the uploaded image URL + dateTime
      await axios.post("https://deep-sky-server.onrender.com/api/v1/blogs", {
        title: formData.title,
        description: formData.description,
        blogImage: imageUrl,
        dateTime: formData.dateTime, // ✅ send datetime
      });

      toast.success("Blog added successfully!");
      setFormData({ title: "", description: "", blogImage: null, dateTime: "" });
      setPreview(null);
      setReload(true);
    } catch (error) {
      console.error(error);
      toast.error("Error saving blog. Try again!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Add New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Rich Text Description */}
          <RichTextEditor
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
          />

          {/* Date & Time Picker */}
          <div>
            <label className="block font-medium mb-2 text-white">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* File Upload with Preview */}
          <div>
            <label className="block font-medium mb-2 text-white">
              Blog Image
            </label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-purple-500 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-white/60">
                    <ImagePlus size={32} />
                    <span className="text-sm mt-2">Upload Image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={uploading}>
            {uploading ? "Submitting..." : "Add New Blog"}
          </Button>
        </form>
      </div>
    </div>
  );
}
