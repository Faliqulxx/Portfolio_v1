-- ============================================================================
-- SUPABASE DATABASE SCHEMA FOR PORTFOLIO FALIQUL ISHBAH
-- ============================================================================

-- 1. PERSONAL INFO TABLE
CREATE TABLE IF NOT EXISTS personal_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  headline TEXT,
  about TEXT,
  avatar_url TEXT,
  cv_url TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. NAVBAR LINKS TABLE
CREATE TABLE IF NOT EXISTS navbar_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hash TEXT NOT NULL,
  order_index INT DEFAULT 0
);

-- 3. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
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
  details TEXT[] DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. WORK EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT,
  location TEXT,
  date_range TEXT NOT NULL,
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  impact TEXT[] DEFAULT '{}',
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
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
  tags TEXT[] DEFAULT '{}',
  icons TEXT[] DEFAULT '{}',
  stats JSONB DEFAULT '{}'::jsonb,
  links JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  key_features JSONB DEFAULT '[]'::jsonb,
  architecture JSONB DEFAULT '{}'::jsonb,
  challenges JSONB DEFAULT '{}'::jsonb,
  outcomes TEXT[] DEFAULT '{}',
  tech_details JSONB DEFAULT '{}'::jsonb,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SKILL CATEGORIES & SKILLS TABLES
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INT DEFAULT 80,
  icon_url TEXT,
  order_index INT DEFAULT 0
);

-- 7. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
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
  skills TEXT[] DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CONTACT INFO TABLE
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  available_for_work BOOLEAN DEFAULT TRUE,
  response_time TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Allow anyone to read portfolio data)
CREATE POLICY "Public Read Personal Info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Public Read Navbar Links" ON navbar_links FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON education FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skill Categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Contact Info" ON contact_info FOR SELECT USING (true);

-- ADMIN ALL POLICIES (Only authenticated users can modify data)
CREATE POLICY "Admin Write Personal Info" ON personal_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Navbar Links" ON navbar_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Skill Categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Contact Info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
