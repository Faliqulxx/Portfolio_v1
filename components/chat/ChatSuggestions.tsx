"use client";

import SuggestionChips from "./SuggestionChips";

const STARTER_PROMPTS = [
  "Ceritakan tentang Faliqul Ishbah dan keahlian yang dimilikinya",
  "Apa saja proyek yang telah dia bangun?",
  "Jelaskan pengalaman nya di bidang Artificial Intelligence, Data Science, dan Machine Learning",
  "Teknologi dan bahasa pemrograman apa saja yang dia kuasai?",
  "Tunjukkan dan jelaskan proyek terbaik yang pernah dia bangun?",
];
export default function ChatSuggestions({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return <SuggestionChips items={STARTER_PROMPTS} onSelect={onSelect} />;
}
