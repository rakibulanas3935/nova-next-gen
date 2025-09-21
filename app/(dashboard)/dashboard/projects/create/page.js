'use client';

import { useState } from 'react';
import Button from '@/app/components/shared/Button';
import useAxiosPost from '@/app/utils/useAxiosPost';
import RichTextEditor from '../../../component/RichTextEditor';
import useAxiosPostFile from '@/app/utils/useAxiosPostFile';
import { useUserContext } from '@/app/context/userContext';
import { ImagePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CreateEventPage() {
  const { user } = useUserContext();
  const [formData, setFormData] = useState({
    title: '',
    liveLink: '',
    projectImage: null,
    description: '',
    createdBy: user?._id || ''
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, projectImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.projectImage) {
      toast.warn("Please fill in all fields and upload an image!");
      return;
    }

    try {
      setLoading(true);

      // Upload image to backend
      const imgData = new FormData();
      imgData.append("image", formData.projectImage);

      const { data: imageResponse } = await axios.post(
        "https://deep-sky-server.onrender.com/api/v1/all/upload-image",
        imgData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Post project with uploaded image URL
      await axios.post("https://deep-sky-server.onrender.com/api/v1/projects", {
        title: formData.title,
        liveLink: formData.liveLink,
        description: formData.description,
        projectImage: imageResponse.url,
        createdBy:  user?._id 
      });

      toast.success("Project uploaded successfully!");
      setFormData({
        title: '',
        liveLink: '',
        projectImage: null,
        description: '',
        createdBy: user?._id || ''
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading project. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Upload New Project
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

          {/* Live Link */}
          <input
            type="text"
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Description */}
          <RichTextEditor
            value={formData.description}
            onChange={(val) => setFormData({ ...formData, description: val })}
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Banner Image</label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-neutral-line rounded-xl cursor-pointer hover:border-purple-500 transition">
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
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Upload Project"}
          </Button>
        </form>
      </div>
    </div>
  );
}
