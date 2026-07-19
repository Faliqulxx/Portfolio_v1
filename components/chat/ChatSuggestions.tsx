"use client";

import SuggestionChips from "./SuggestionChips";

const STARTER_PROMPTS = [
  "Ceritakan tentang Faliqul Ishbah dan keahlian yang dimilikinya",
  "Apa saja proyek yang telah dibangun oleh Faliqul Ishbah?",
  "Jelaskan pengalaman Faliqul Ishbah di bidang Artificial Intelligence, Data Science, dan Machine Learning",
  "Teknologi dan bahasa pemrograman apa saja yang dikuasai oleh Faliqul Ishbah?",
  "Tunjukkan dan jelaskan proyek terbaik yang pernah dibangun oleh Faliqul Ishbah",
];
export default function ChatSuggestions({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return <SuggestionChips items={STARTER_PROMPTS} onSelect={onSelect} />;
}
