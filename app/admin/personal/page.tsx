"use client";

import React, { useState, useEffect } from "react";
import { updatePersonalInfoAction, uploadPortfolioMedia } from "@/actions/adminActions";
import { toast } from "react-hot-toast";
import { User, Upload, Save, Loader2 } from "lucide-react";

export default function PersonalInfoAdminPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Faliqul Ishbah",
    title: "Data Scientist & AI Developer",
    headline: "Transforming raw data into intelligent automation",
    about: "",
    avatar_url: "/images/profile.png",
    cv_url: "/cv/Faliqul Ishbah CV.pdf",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "avatar_url" | "cv_url") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    const res = await uploadPortfolioMedia(data);
    setUploading(false);

    if (res.success && res.url) {
      setFormData((prev) => ({ ...prev, [fieldName]: res.url }));
      toast.success(`${fieldName === "avatar_url" ? "Avatar" : "CV"} uploaded to Supabase Storage!`);
    } else {
      toast.error(res.error || "Upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updatePersonalInfoAction(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Personal information updated successfully!");
    } else {
      toast.error(res.error || "Failed to update");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-400" /> Personal Information Editor
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Update your profile details, bio, avatar, and CV document.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Job Title / Headline Role
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Short Tagline / Subtitle
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Bio / About Me Summary
          </label>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            onChange={handleChange}
            placeholder="Write a brief introduction about your background and expertise..."
            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition resize-none"
          />
        </div>

        {/* Media Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Profile Avatar Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-300 font-mono"
              />
              <label className="cursor-pointer px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "avatar_url")}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              CV Document (PDF)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="cv_url"
                value={formData.cv_url}
                onChange={handleChange}
                className="flex-1 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-300 font-mono"
              />
              <label className="cursor-pointer px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5" />
                Upload
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, "cv_url")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 transition shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Personal Info
          </button>
        </div>
      </form>
    </div>
  );
}
