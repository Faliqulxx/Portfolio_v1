import {
  links as staticLinks,
  personalData as staticPersonal,
  educationData as staticEducation,
  certificatesData as staticCertificates,
  galleryData as staticGallery,
  projectsData as staticProjects,
  skillsData as staticSkills,
  skilss as staticTechIcons,
  experiencesData as staticExperiences,
  contactData as staticContact,
} from './data';

// Helper to check if Supabase env vars are configured
function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// 1. Fetch Personal Info
export async function getPersonalInfo() {
  if (!isSupabaseConfigured()) return staticPersonal;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase.from('personal_info').select('*').single();
    if (error || !data) return staticPersonal;
    return data;
  } catch {
    return staticPersonal;
  }
}

// 2. Fetch Projects
export async function getProjects() {
  if (!isSupabaseConfigured()) return staticProjects;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return staticProjects;
    return data;
  } catch {
    return staticProjects;
  }
}

// 3. Fetch Experiences
export async function getExperiences() {
  if (!isSupabaseConfigured()) return staticExperiences;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return staticExperiences;
    return data;
  } catch {
    return staticExperiences;
  }
}

// 4. Fetch Education
export async function getEducation() {
  if (!isSupabaseConfigured()) return staticEducation;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return staticEducation;
    return data;
  } catch {
    return staticEducation;
  }
}

// 5. Fetch Certificates
export async function getCertificates() {
  if (!isSupabaseConfigured()) return staticCertificates;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return staticCertificates;
    return data;
  } catch {
    return staticCertificates;
  }
}

// 6. Fetch Gallery
export async function getGallery() {
  if (!isSupabaseConfigured()) return staticGallery;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return staticGallery;
    return data;
  } catch {
    return staticGallery;
  }
}

// 7. Fetch Contact Info
export async function getContactInfo() {
  if (!isSupabaseConfigured()) return staticContact;
  try {
    const { createClient } = await import('./supabase/server');
    const supabase = createClient();
    const { data, error } = await supabase.from('contact_info').select('*').single();
    if (error || !data) return staticContact;
    return data;
  } catch {
    return staticContact;
  }
}
