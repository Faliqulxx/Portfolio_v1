"use client";

import { createContext, useContext, useState } from "react";

type CVPreviewState = {
  isOpen: boolean;
  pdfUrl: string;
  downloadUrl: string;
  title: string;
};

type CVPreviewContextType = CVPreviewState & {
  openPreview: (pdfUrl: string, downloadUrl: string, title: string) => void;
  closePreview: () => void;
};

const CVPreviewContext = createContext<CVPreviewContextType>({
  isOpen: false,
  pdfUrl: "",
  downloadUrl: "",
  title: "",
  openPreview: () => {},
  closePreview: () => {},
});

export function CVPreviewProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CVPreviewState>({
    isOpen: false,
    pdfUrl: "",
    downloadUrl: "",
    title: "",
  });

  const openPreview = (pdfUrl: string, downloadUrl: string, title: string) =>
    setState({ isOpen: true, pdfUrl, downloadUrl, title });

  const closePreview = () =>
    setState((s) => ({ ...s, isOpen: false }));

  return (
    <CVPreviewContext.Provider value={{ ...state, openPreview, closePreview }}>
      {children}
    </CVPreviewContext.Provider>
  );
}

export const useCVPreview = () => useContext(CVPreviewContext);
