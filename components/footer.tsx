import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mb-2 px-4 text-center text-gray-600 dark:text-gray-400">
      <div className="max-w-6xl mx-auto border-t border-gray-200/60 dark:border-white/10 pt-8 pb-4">
        <small className="block text-sm font-medium">
          &copy; {currentYear} Faliqul Ishbah. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
