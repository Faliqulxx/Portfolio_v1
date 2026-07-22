import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Image as ImageIcon,
  Wrench,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Personal Info", href: "/admin/personal", icon: User },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Education", href: "/admin/education", icon: GraduationCap },
    { label: "Certificates", href: "/admin/certificates", icon: Award },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Skills", href: "/admin/skills", icon: Wrench },
  ];

  return (
    <div className="min-h-screen flex bg-gray-950 text-white font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-white">Portfolio Admin</h2>
              <p className="text-xs text-gray-400">Dashboard Control</p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl transition"
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-800">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800/80 hover:bg-red-950/40 text-gray-300 hover:text-red-400 rounded-xl text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-gray-800 px-6 flex items-center justify-between bg-gray-900/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-gray-400 font-medium">
              System Status: Connected
            </span>
          </div>

          <div className="text-xs text-gray-400">
            Welcome back, <span className="text-white font-semibold">Faliqul Ishbah</span>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
