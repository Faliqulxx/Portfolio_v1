import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  ArrowRight,
  Database,
} from "lucide-react";
import {
  getProjects,
  getExperiences,
  getEducation,
  getCertificates,
} from "@/lib/db";

export default async function AdminDashboardOverview() {
  const projects = await getProjects();
  const experiences = await getExperiences();
  const education = await getEducation();
  const certificates = await getCertificates();

  const stats = [
    {
      title: "Total Projects",
      count: projects.length,
      icon: FolderGit2,
      href: "/admin/projects",
      color: "from-blue-500/20 to-indigo-500/20 border-indigo-500/30 text-indigo-400",
    },
    {
      title: "Experiences",
      count: experiences.length,
      icon: Briefcase,
      href: "/admin/experience",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    },
    {
      title: "Certificates",
      count: certificates.length,
      icon: Award,
      href: "/admin/certificates",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    },
    {
      title: "Education History",
      count: education.length,
      icon: GraduationCap,
      href: "/admin/education",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border border-gray-800 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Admin Management Center
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Manage your portfolio data in real-time. Changes made here update the live public portfolio instantaneously.
          </p>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className={`p-6 bg-gradient-to-br ${stat.color} border rounded-2xl flex items-center justify-between group hover:scale-[1.02] transition shadow-lg`}
            >
              <div>
                <span className="text-3xl font-bold text-white block mb-1">
                  {stat.count}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {stat.title}
                </span>
              </div>
              <div className="p-3 bg-gray-900/60 rounded-xl group-hover:bg-gray-900 transition">
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Module Overview Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-lg text-white">Portfolio Data Modules</h3>
          </div>
          <span className="text-xs text-gray-400 font-mono">10 Modules Registered</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            { label: "Personal Information", desc: "Bio, social links, stats & CV URL", href: "/admin/personal" },
            { label: "Projects Portfolio", desc: "Features, architecture & screenshots", href: "/admin/projects" },
            { label: "Work Experience", desc: "Companies, impact points & roles", href: "/admin/experience" },
            { label: "Certifications", desc: "Badges, issuers & credential links", href: "/admin/certificates" },
            { label: "Education History", desc: "Degrees, institutions & GPA", href: "/admin/education" },
            { label: "Photo Gallery", desc: "Portfolio media & showcase images", href: "/admin/gallery" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="p-4 bg-gray-950/60 border border-gray-800 hover:border-indigo-500/50 rounded-xl flex items-center justify-between group transition"
            >
              <div>
                <h4 className="font-semibold text-white text-sm group-hover:text-indigo-400 transition">
                  {item.label}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-indigo-400 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
