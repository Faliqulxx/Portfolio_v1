import { createClient } from '@supabase/supabase-js';
import {
  personalData,
  educationData,
  experiencesData,
  projectsData,
  certificatesData,
  galleryData,
  skillsData,
  contactData,
  links,
} from '../lib/data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase URL or Service Role Key missing in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🚀 Starting Data Migration to Supabase...');

  // 1. Personal Info
  console.log('📦 Seeding Personal Info...');
  await supabase.from('personal_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('personal_info').insert({
    name: personalData.name,
    title: personalData.title,
    headline: personalData.headline,
    about: personalData.about,
    avatar_url: personalData.avatar,
    cv_url: personalData.cvUrl,
    socials: personalData.socials,
    stats: personalData.stats,
  });

  // 2. Navbar Links
  console.log('📦 Seeding Navbar Links...');
  await supabase.from('navbar_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < links.length; i++) {
    await supabase.from('navbar_links').insert({
      name: links[i].name,
      hash: links[i].hash,
      order_index: i,
    });
  }

  // 3. Education
  console.log('📦 Seeding Education...');
  await supabase.from('education').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < educationData.length; i++) {
    const edu = educationData[i];
    await supabase.from('education').insert({
      level: edu.level,
      degree: edu.degree,
      institution: edu.institution,
      field: edu.field,
      location: edu.location,
      year_range: edu.year,
      gpa: edu.gpa,
      gpa_max: edu.gpaMax,
      logo_url: edu.logo,
      description: edu.description,
      details: edu.details,
      order_index: i,
    });
  }

  // 4. Experiences
  console.log('📦 Seeding Work Experiences...');
  await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < experiencesData.length; i++) {
    const exp = experiencesData[i];
    await supabase.from('experiences').insert({
      title: exp.title,
      company: exp.company || '',
      type: exp.type || '',
      location: exp.location,
      date_range: exp.date || '',
      description: exp.description,
      skills: exp.skills || [],
      impact: exp.impact || [],
      image_url: exp.image || '',
      order_index: i,
    });
  }

  // 5. Projects
  console.log('📦 Seeding Projects...');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    await supabase.from('projects').insert({
      title: p.title,
      slug: p.slug,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      period: p.period,
      role: p.role,
      status: p.status,
      featured: p.featured,
      tags: p.tags,
      icons: p.icons,
      stats: p.stats,
      links: p.links,
      images: p.images,
      highlights: p.highlights,
      key_features: p.keyFeatures,
      architecture: p.architecture,
      challenges: p.challenges,
      outcomes: p.outcomes,
      tech_details: p.techDetails,
      order_index: i,
    });
  }

  // 6. Certificates
  console.log('📦 Seeding Certificates...');
  await supabase.from('certificates').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < certificatesData.length; i++) {
    const cert = certificatesData[i];
    await supabase.from('certificates').insert({
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.date,
      expiration_date: cert.expirationDate,
      credential_id: cert.credentialId,
      credential_url: cert.credentialUrl,
      category: cert.category,
      image_url: cert.image,
      description: cert.description,
      skills: cert.skills,
      order_index: i,
    });
  }

  // 7. Gallery
  console.log('📦 Seeding Gallery...');
  await supabase.from('gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (let i = 0; i < galleryData.length; i++) {
    const g = galleryData[i];
    await supabase.from('gallery').insert({
      title: g.title,
      category: g.category,
      image_url: g.imageUrl,
      description: g.description,
      order_index: i,
    });
  }

  // 8. Contact Info
  console.log('📦 Seeding Contact Info...');
  await supabase.from('contact_info').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('contact_info').insert({
    email: contactData.email,
    phone: contactData.phone,
    location: contactData.location,
    socials: contactData.socials,
    available_for_work: contactData.availableForFreelance,
    response_time: contactData.responseTime,
  });

  console.log('✅ Data Seeding Completed Successfully!');
}

seed().catch((err) => {
  console.error('❌ Seeding Error:', err);
});
