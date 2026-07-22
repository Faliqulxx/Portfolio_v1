# Product Requirement Document (PRD) & Architecture Plan
## Admin Dashboard & Dynamic CRUD System untuk Portfolio

**Document Version:** 1.0.0  
**Project:** Portfolio Faliqul Ishbah (`Portfolio_v1`)  
**Target:** Admin Dashboard untuk pengelolaan data dynamic menggantikan `lib/data.ts`  

---

## 1. Executive Summary & Goal

Saat ini, seluruh data portofolio (Personal Info, Education, Experience, Projects, Skills, Certificates, Gallery, & Contact) disimpan secara statis dalam file `lib/data.ts`. Setiap perubahan data memerlukan pengeditan kode sumber dan *re-deploy* aplikasi.

**Tujuan Utama:**
Membangun **Admin Dashboard (CRUD)** yang aman, modern, dan responsif di dalam aplikasi Next.js ini untuk mengelola seluruh data portofolio secara real-time tanpa perlu mengubah kode atau melakukan deployment ulang.

---

## 2. Scope & Target Data (Entitas dari `data.ts`)

Admin Dashboard akan mendukung operasi **Create, Read, Update, Delete (CRUD)** serta **Reordering/Sorting** untuk 10 modul data utama:

| No | Modul Data | Tipe Data | Deskripsi & Field Utama |
|---|---|---|---|
| 1 | **Personal Info** | Single Object | Name, Title, Headline, Bio/About, Avatar URL, CV PDF Link, Social Links (LinkedIn, GitHub, Instagram, Email), Stats (Experience Years, Completed Projects, etc.). |
| 2 | **Navbar Links** | List Array | Label Name, Section Hash Anchor (`#home`, `#about`, dll.), Order Index. |
| 3 | **Education** | List Array | Level (S1, SMA, etc.), Degree, Institution, Field, Location, Year Range, GPA/Max GPA, Logo Image, Description, Details Bullet Points. |
| 4 | **Work Experience** | List Array | Job Title, Company, Work Type (Freelance, Full-time, etc.), Location, Date Range, Icon, Description, Skills Used, Impact Points, Company Image/Logo. |
| 5 | **Projects** | List Array (Complex) | Title, Slug, Tagline, Category, Period, Role, Status, Featured Toggle, Tags, Tech Stack Icons, Stats, Links (Live, GitHub, Demo), Screenshots Array, Highlights, Key Features, Architecture (Overview, TechStack), Challenges & Solutions, Outcomes. |
| 6 | **Skills & Categories** | Nested List | Skill Categories (e.g. Data Science, Web Dev), Skill Items (Name, Proficiency Level 1-100%, Icon URL/Class). |
| 7 | **Tech Icons (Marquee)** | List Array | Icon ID, Name, SVG/Image URL. |
| 8 | **Certificates** | List Array | Title, Issuer, Date, Expiration Date, Credential ID, Credential URL, Category, Certificate Image, Description, Skills Badge. |
| 9 | **Gallery** | List Array | Title, Category, Image URL, Description/Caption, Order. |
| 10 | **Contact Info** | Single Object | Email, Phone, Location, Social Handles, Available for Work Toggle, Average Response Time. |

---

## 3. Architecture & Tech Stack

### 3.1 Backend & Database Options

#### Recommended Architecture: **Supabase (PostgreSQL + Auth + Storage)**
- **Database:** PostgreSQL hosted di Supabase (Relational schema untuk Projects, Experience, Skills, Education, dll).
- **Authentication:** Supabase Auth (Email + Password Login & Session Cookie).
- **Storage Bucket:** Supabase Storage (Bucket `portfolio-assets` untuk Upload Gambar Sertifikat, Logo, Screenshot Proyek, PDF CV).
- **ORM / Client:** `@supabase/supabase-js` & `@supabase/ssr`.
- **Fallback Mechanism:** Jika koneksi DB gagal atau belum dikonfigurasi, sistem otomatis membaca data default dari `lib/data.ts` sebagai fallback.

### 3.2 Frontend Admin UI (`app/admin/*`)

- **Framework:** Next.js 13+ App Router (Route Group `(admin)` atau `/admin`).
- **UI Components:** Tailwind CSS, Lucide Icons, Framer Motion, Radix UI / Shadcn UI components (Dialog, Drawer, Toast, Data Tables).
- **Form Management:** React Hook Form + Zod Schema Validation.
- **Image Upload:** Drag-and-drop Image Uploader dengan instant preview & direct storage upload.
- **Revalidation:** Server Actions / Next.js `revalidatePath('/')` & `revalidateTag()` untuk pembaruan tampilan publik secara instan tanpa reload.

---

## 4. Admin Dashboard Module & User Experience (UX)

### 4.1 Routing & Route Security

- `/admin/login` : Halaman Login Admin (Email & Password dengan rate limiting).
- `/admin` : Main Dashboard Overview (Quick Stats, Quick Availability Toggle, Recent Activity).
- `/admin/personal` : Editor Personal Info & Contact Details.
- `/admin/projects` : Data Table & Form Editor untuk Projects (Support Filter by Category/Featured, Rich Multi-tab Form).
- `/admin/experiences` : List & Order Manager untuk Work Experiences.
- `/admin/education` : List Editor untuk Education History.
- `/admin/skills` : Category & Skill Level Manager.
- `/admin/certificates` : Certificate Gallery & Credential Link Manager.
- `/admin/gallery` : Photo Manager untuk Gallery Portofolio.
- `/admin/media` : Asset & Image Storage Manager.

### 4.2 Security & Protection Rules

1. **Middleware Protection:** All `/admin/*` routes (except `/admin/login`) are protected by Next.js Middleware checking Supabase Auth JWT Session Cookies.
2. **Database RLS (Row Level Security):**
   - `SELECT`: Public (siapa saja bisa membaca data publik).
   - `INSERT / UPDATE / DELETE`: Only Authenticated Admin Users (`auth.uid() = admin_id`).
3. **API Rate Limiting:** Proteksi pada endpoint login dan mutation server actions.

---

## 5. Database Schema Design (SQL Preview)

```sql
-- 1. Personal Info
CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  headline TEXT,
  about TEXT,
  avatar_url TEXT,
  cv_url TEXT,
  socials JSONB,
  stats JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  category TEXT NOT NULL,
  period TEXT,
  role TEXT,
  status TEXT,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  icons TEXT[],
  stats JSONB,
  links JSONB,
  images TEXT[],
  highlights TEXT[],
  key_features JSONB,
  architecture JSONB,
  challenges JSONB,
  outcomes TEXT[],
  tech_details JSONB,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT,
  location TEXT,
  date_range TEXT NOT NULL,
  description TEXT,
  skills TEXT[],
  impact TEXT[],
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Education
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  field TEXT,
  location TEXT,
  year_range TEXT NOT NULL,
  gpa TEXT,
  gpa_max TEXT,
  logo_url TEXT,
  description TEXT,
  details TEXT[],
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  expiration_date TEXT,
  credential_id TEXT,
  credential_url TEXT,
  category TEXT,
  image_url TEXT,
  description TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Skills & Skill Categories
CREATE TABLE skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL,
  order_index INT DEFAULT 0
);

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INT DEFAULT 80,
  icon_url TEXT,
  order_index INT DEFAULT 0
);

-- 7. Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 6. Implementation Roadmap (Phases)

### **Fase 1: Database Setup & Migration Script**
- Konfigurasi Supabase Project (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- Eksekusi SQL Migration DDL di Supabase.
- Buat script Seeder (`scripts/seed.ts`) untuk migrasi data dari `lib/data.ts` ke Supabase DB.
- Buat helper Data Fetcher dengan fallback: `getPortfolioData()` (jika DB aktif, ambil dari DB; jika error/kosong, ambil dari `lib/data.ts`).

### **Fase 2: Authentication & Middleware**
- Setup Supabase Auth Client & Server Utilities (`lib/supabase/client.ts`, `lib/supabase/server.ts`).
- Halaman Login Admin (`/admin/login`) dengan UI modern & toast notification.
- Middleware protection (`middleware.ts`) untuk membatasi akses `/admin/*`.

### **Fase 3: Core CRUD Modules Development**
- **Personal & Contact Editor:** Form real-time update info personal & status ketersediaan kerja.
- **Projects Management (Complex Form):** Table view + Form modal/drawer dengan multi-tab (Basic Info, Images Upload, Architecture & Highlights, Tech Stack).
- **Experiences & Education Manager:** List & Form CRUD.
- **Certificates & Gallery Manager:** Grid View + Image Dropzone + Credential Link Validation.
- **Skills Manager:** Drag-and-drop / inline ordering & category management.

### **Fase 4: Real-time Cache Revalidation & Storage**
- Integrasi Supabase Storage untuk upload gambar langsung dari dashboard.
- Tambahkan Server Actions dengan `revalidatePath('/')` sehingga setiap simpan data di admin langsung terrefleksi di landing page publik.

### **Fase 5: Testing, Security & Optimization**
- Unit & E2E Testing untuk flow login & CRUD.
- Optimasi gambar (WebP auto conversion via Supabase Transform / Next Image).
- Final Polish UI Admin (Dark mode toggle, responsive mobile drawer, search & filter).

---

## 7. Success Criteria

1. **Zero Downtime Updates:** Pemilik portofolio dapat menambah/mengedit proyek, sertifikat, dan pengalaman kerja dalam < 10 detik tanpa re-deploy.
2. **Complete Parity:** Seluruh 10 modul data dari `lib/data.ts` dapat di-CRUD 100% dari Dashboard Admin.
3. **High Security:** Route `/admin` terlindungi total dari akses publik via Supabase Auth + Middleware.
4. **Seamless Fallback:** Jika database offline/maintenance, situs publik tetap berjalan lancar menggunakan fallback `data.ts`.

---

*Dokumen ini dapat digunakan sebagai referensi pengembang (Developer Spec) untuk pengerjaan fitur Admin Dashboard Portofolio.*
