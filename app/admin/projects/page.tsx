"use client";

import React, { useState } from "react";
import { FolderGit2, Plus, Trash2, Edit3, ExternalLink } from "lucide-react";
import { toast } from "react-hot-toast";
import { saveProjectAction, deleteProjectAction } from "@/actions/adminActions";

export default function ProjectsAdminPage() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    category: "AI Automation",
    period: "2024",
    role: "Lead Developer",
    status: "Completed",
    featured: false,
    tags: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      category: "AI Automation",
      period: "2024",
      role: "Lead Developer",
      status: "Completed",
      featured: false,
      tags: "",
    });
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tags: typeof formData.tags === "string" ? formData.tags.split(",").map((t) => t.trim()) : formData.tags,
    };

    const res = await saveProjectAction(payload, editingId || undefined);
    setLoading(false);

    if (res.success) {
      toast.success(editingId ? "Project updated!" : "New project created!");
      setShowModal(false);
      resetForm();
    } else {
      toast.error(res.error || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await deleteProjectAction(id);
    if (res.success) {
      toast.success("Project deleted");
    } else {
      toast.error(res.error || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-indigo-400" /> Projects Portfolio Manager
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Add, update, or remove portfolio projects displayed on the public site.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center gap-2 text-sm transition shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Projects List Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <p className="text-xs text-gray-400 font-mono mb-4">
          Interactive table view connected to Supabase Database with dynamic fallback.
        </p>

        <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
          <FolderGit2 className="w-10 h-10 mx-auto text-gray-700 mb-3" />
          <p className="text-sm font-medium text-gray-400">Projects Database Ready</p>
          <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
            Click "Add Project" to insert new projects directly into Supabase Storage & Database.
          </p>
        </div>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <h2 className="text-lg font-bold text-white">
              {editingId ? "Edit Project" : "Create New Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chatbot AI Assistant"
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Period</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Short one-line summary"
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, Next.js, Python, n8n"
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-800 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="featured" className="text-xs text-gray-300">
                  Featured Project (Show on top of list)
                </label>
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
