type Topic = "projects" | "skills" | "contact" | "general";

const TOPIC_KEYWORDS: Record<Exclude<Topic, "general">, string[]> = {
  projects: [
    "project",
    "proyek",
    "aplikasi",
    "sistem",
    "website",
    "app",
    "build",
    "built",
  ],
  skills: [
    "skill",
    "python",
    "javascript",
    "typescript",
    "machine learning",
    "data science",
    "ai automation",
    "teknologi",
    "bahasa pemrograman",
    "framework",
    "react",
    "next.js",
  ],
  contact: ["contact", "kontak", "hubungi", "email", "cv", "reach"],
};

const FOLLOW_UPS: Record<Topic, string[]> = {
  projects: [
    "Ceritakan lebih detail tentang proyek ini",
    "Teknologi apa saja yang Anda gunakan?",
    "Tantangan apa saja yang Anda hadapi?",
    "Apakah saya bisa melihat kode sumbernya?",
    "Apa peran Anda dalam proyek tersebut?",
  ],
  skills: [
    "Tunjukkan pengalaman Anda dengan Python",
    "Jelaskan proyek AI yang pernah Anda buat",
    "Ceritakan tentang keahlian Data Science Anda",
    "Apakah Anda pernah membangun aplikasi production?",
  ],
  contact: [
    "Apa cara terbaik untuk menghubungi Anda?",
    "Apakah Anda menerima pekerjaan freelance?",
    "Apakah saya bisa melihat CV Anda?",
  ],
  general: [
    "Ceritakan tentang diri Anda",
    "Apa saja proyek yang sudah Anda bangun?",
    "Teknologi AI apa saja yang Anda gunakan?",
    "Bagaimana cara menghubungi Anda?",
  ],
};

function detectTopic(text: string): Topic {
  const lower = text.toLowerCase();
  const entries = Object.entries(TOPIC_KEYWORDS) as [
    Exclude<Topic, "general">,
    string[]
  ][];

  for (const [topic, keywords] of entries) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return topic;
    }
  }
  return "general";
}

export function getFollowUpSuggestions(
  lastAssistantMessage: string,
  count = 4
): string[] {
  if (!lastAssistantMessage.trim()) return [];
  const topic = detectTopic(lastAssistantMessage);
  return FOLLOW_UPS[topic].slice(0, count);
}
