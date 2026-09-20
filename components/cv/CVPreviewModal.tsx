"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX, FiMaximize2, FiExternalLink } from "react-icons/fi";
import { useCVPreview } from "@/context/cv-preview-context";

export default function CVPreviewModal() {
  const { isOpen, pdfUrl, downloadUrl, title, closePreview } = useCVPreview();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") closePreview(); },
    [closePreview]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setIframeLoaded(false);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cv-preview-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreview}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="cv-preview-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-4xl h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-gray-900 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-white/60 hidden sm:block">
                    {title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <FiExternalLink size={13} />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                  <a
                    href={downloadUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#10b981] hover:opacity-90 text-white text-xs font-semibold transition-opacity shadow-sm"
                  >
                    <FiDownload size={13} />
                    <span>Download</span>
                  </a>
                  <button
                    onClick={closePreview}
                    title="Close (Esc)"
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ml-1"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 relative bg-gray-100 dark:bg-gray-950 overflow-hidden">
                {/* Loading skeleton */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                    <div className="w-10 h-10 rounded-full border-4 border-cyan-200 border-t-[#06b6d4] animate-spin" />
                    <p className="text-sm text-gray-400 dark:text-white/40">Loading PDF...</p>
                  </div>
                )}

                <iframe
                  src={`${pdfUrl}#toolbar=1&view=FitH`}
                  title={title}
                  className={`w-full h-full border-0 transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
