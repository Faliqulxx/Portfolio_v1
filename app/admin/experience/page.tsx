"use client";

import React, { useState } from "react";
import { Briefcase, Plus, Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { saveExperienceAction, uploadPortfolioMedia } from "@/actions/adminActions";

export default function ExperienceAdminPage() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "Freelance",
    location: "Gresik",
    date_range: "2024 - Present",
    description: "",
    image_url: "",
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    const res = await uploadPortfolioMedia(data);
    if (res.success && res.url) {
      setFormData((prev) => ({ ...prev, image_url: res.url }));
      toast.success("Company logo uploaded!");
    } else {
      toast.error(res.error || "Upload failed");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveExperienceAction(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Work experience added!");
      setShowModal(false);
      setFormData({
        title: "",
        company: "",
        type: "Freelance",
        location: "Gresik",
        date_range: "2024 - Present",
        description: "",
        image_url: "",
      });
    } else {
      toast.error(res.error || "Failed to add experience");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" /> Work Experience Manager
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your employment history, roles, and impact points for the ScrollStack experience section.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl flex items-center gap-2 text-sm transition shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <p className="text-xs text-gray-400 font-mono mb-4">
          Data synchronizes directly with the ScrollStack component in the Experience section.
        </p>

        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
          <Briefcase className="w-10 h-10 mx-auto text-gray-700 mb-3" />
          <p className="text-sm font-medium text-gray-400">Experience Database Ready</p>
          <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
            Add new work experience cards to update your portfolio timeline in real-time.
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white">Add Work Experience</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Automation Specialist"
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Date Range</label>
                  <input
                    type="text"
                    value={formData.date_range}
                    onChange={(e) => setFormData({ ...formData, date_range: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Company Logo</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-gray-300 font-mono"
                  />
                  <label className="cursor-pointer px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" /> Upload
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
