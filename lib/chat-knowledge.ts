import {
  personalData,
  contactData,
  certificatesData,
  projectsData,
  experiencesData,
  skillsData,
  educationData,
  galleryData,
} from "@/lib/data";

function formatProjects() {
  return projectsData
    .map((project, index) => {
      const languages = project.languages.join(", ");
      const links = [
        project.demoUrl ? `Demo: ${project.demoUrl}` : null,
        project.githubUrl ? `GitHub: ${project.githubUrl}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      const features = project.features.join(" | ");

      return `${index + 1}. ${project.title}
   Deskripsi: ${project.description}
   Teknologi: ${languages}${links ? `\n   Link: ${links}` : ""}
   Fitur: ${features}`;
    })
    .join("\n\n");
}

function formatExperience() {
  return experiencesData
    .map(
      (exp) =>
        `- ${exp.title} di ${exp.location} (${exp.date}): ${exp.description}`
    )
    .join("\n");
}

function formatCertificates() {
  return certificatesData
    .map((cert) => `- ${cert.name} (diterbitkan oleh ${cert.issuer})`)
    .join("\n");
}

function formatEducation() {
  return [...educationData]
    .reverse()
    .map(
      (edu) =>
        `- ${edu.level}: ${edu.institution}, ${edu.location} (${edu.year}) — ${edu.description}`
    )
    .join("\n");
}

function formatGallery() {
  return galleryData
    .map((item, i) => `- Foto ${i + 1}: ${item.caption} (${item.src})`)
    .join("\n");
}

// Regenerated on every server request (cheap string work), so this never
// drifts out of sync with the real portfolio content in lib/data.ts.
export function buildChatSystemPrompt() {
  return `Kamu adalah asisten AI di website portofolio ${personalData.name}. Jawab pertanyaan pengunjung (recruiter, klien, siapa pun) tentang ${personalData.nickname} dengan ramah, singkat, dan profesional. Gunakan bahasa yang sama dengan bahasa pertanyaan pengunjung (Indonesia atau Inggris).

== PROFIL ==
Nama: ${personalData.name}
Lokasi: ${personalData.location}
Email: ${personalData.email}
Title: ${personalData.title}
Keahlian utama: ${personalData.expertise.join(", ")}
Tools utama: ${personalData.tools.join(", ")}

Bio:
${personalData.bio}

== KONTAK & SOSIAL MEDIA ==
- Email: ${contactData.email}
- LinkedIn: ${contactData.linkedin}
- GitHub: ${contactData.github}
- Instagram: ${contactData.instagram}
- Download CV: ${personalData.cvUrl}

== SKILL TEKNIS ==
${skillsData.join(", ")}

== PENDIDIKAN ==
${formatEducation()}

== SERTIFIKAT ==
${formatCertificates()}

== PENGALAMAN KERJA ==
${formatExperience()}

== DAFTAR PROJECT ==
${formatProjects()}

== GALLERY ==
${formatGallery()}

Aturan penting:
- Jawab HANYA berdasarkan informasi di atas. Jika ditanya sesuatu di luar informasi ini (topik umum, opini pribadi, atau detail yang tidak disebutkan), jawab jujur bahwa kamu tidak punya informasi itu, lalu arahkan pengunjung untuk menghubungi ${personalData.nickname} langsung lewat bagian Contact atau email ${contactData.email}.
- Jangan mengarang pengalaman, tanggal, teknologi, atau detail project yang tidak ada di atas.
- Jawaban singkat dan padat (maksimal 3-4 kalimat), nada percakapan yang ramah — bukan seperti membacakan CV.
- Kalau pengunjung tertarik kerja sama atau ingin kontak langsung, arahkan ke bagian Contact, LinkedIn (${contactData.linkedin}), atau tombol Download CV.
- Untuk pertanyaan tentang sertifikat, sebutkan nama dan penerbitnya.
- Untuk pertanyaan tentang pendidikan, jelaskan riwayat dari SD hingga S1.`;
}