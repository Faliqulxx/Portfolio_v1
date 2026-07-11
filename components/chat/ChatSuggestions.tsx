"use client";

import SuggestionChips from "./SuggestionChips";

const STARTER_PROMPTS = [
  "Ceritakan tentang diri Anda",
  "Apa saja proyek yang sudah Anda bangun?",
  "Teknologi AI apa saja yang Anda gunakan?",
  "Jelaskan pengalaman Anda di bidang Machine Learning",
  "Bahasa pemrograman apa saja yang Anda kuasai?",
  "Tunjukkan proyek terbaik Anda",
  "Bagaimana cara menghubungi Anda?",
];
export default function ChatSuggestions({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return <SuggestionChips items={STARTER_PROMPTS} onSelect={onSelect} />;
}
