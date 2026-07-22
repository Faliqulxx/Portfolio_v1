-- ============================================================================
-- 001_init.sql : INITIAL DATABASE SCHEMA & RLS POLICIES FOR PORTFOLIO
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

-- 2. NAVBAR LINKS TABLE (Modul #2)
CREATE TABLE IF NOT EXISTS navbar_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hash TEXT NOT NULL,
  order_index INT DEFAULT 0
);

-- 3. PROJECTS TABLE
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

-- 4. EXPERIENCES TABLE
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

-- 5. EDUCATION TABLE
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

-- 6. CERTIFICATES TABLE
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

-- 7. SKILL CATEGORIES & SKILLS TABLES
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

-- 8. TECH ICONS / MARQUEE TABLE (Modul #7)
CREATE TABLE IF NOT EXISTS tech_icons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  img_url TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CONTACT INFO TABLE (Modul #10)
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

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES (Rules 4.2)
-- SELECT: Public (Anyone can read)
-- INSERT / UPDATE / DELETE: Authenticated Admin Only (auth.role() = 'authenticated')
-- ============================================================================

-- Enable RLS for all tables
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE navbar_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- 1. personal_info Policies
CREATE POLICY "Public Read personal_info" ON personal_info FOR SELECT USING (true);
CREATE POLICY "Admin All personal_info" ON personal_info FOR ALL USING (auth.role() = 'authenticated');

-- 2. navbar_links Policies
CREATE POLICY "Public Read navbar_links" ON navbar_links FOR SELECT USING (true);
CREATE POLICY "Admin All navbar_links" ON navbar_links FOR ALL USING (auth.role() = 'authenticated');

-- 3. projects Policies
CREATE POLICY "Public Read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admin All projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 4. experiences Policies
CREATE POLICY "Public Read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Admin All experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');

-- 5. education Policies
CREATE POLICY "Public Read education" ON education FOR SELECT USING (true);
CREATE POLICY "Admin All education" ON education FOR ALL USING (auth.role() = 'authenticated');

-- 6. certificates Policies
CREATE POLICY "Public Read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Admin All certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');

-- 7. skill_categories & skills Policies
CREATE POLICY "Public Read skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Admin All skill_categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Admin All skills" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- 8. tech_icons Policies
CREATE POLICY "Public Read tech_icons" ON tech_icons FOR SELECT USING (true);
CREATE POLICY "Admin All tech_icons" ON tech_icons FOR ALL USING (auth.role() = 'authenticated');

-- 9. gallery Policies
CREATE POLICY "Public Read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin All gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- 10. contact_info Policies
CREATE POLICY "Public Read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Admin All contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
