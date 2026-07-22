"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ============================================================================
// 1. IMAGE / FILE UPLOAD TO SUPABASE STORAGE
// ============================================================================
export async function uploadPortfolioMedia(formData: FormData) {
  const file = formData.get("file") as File;
  const bucket = (formData.get("bucket") as string) || "portfolio-assets";

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrlData.publicUrl,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Upload failed" };
  }
}

// ============================================================================
// 2. PERSONAL INFO CRUD
// ============================================================================
export async function updatePersonalInfoAction(payload: any) {
  try {
    const supabase = createClient();

    // Check if record exists
    const { data: existing } = await supabase
      .from("personal_info")
      .select("id")
      .single();

    let error;
    if (existing) {
      const res = await supabase
        .from("personal_info")
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      error = res.error;
    } else {
      const res = await supabase.from("personal_info").insert(payload);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/personal");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================================================================
// 3. PROJECTS CRUD
// ============================================================================
export async function saveProjectAction(projectData: any, id?: string) {
  try {
    const supabase = createClient();
    let error;

    if (id) {
      const res = await supabase
        .from("projects")
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("projects").insert(projectData);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================================================================
// 4. EXPERIENCES CRUD
// ============================================================================
export async function saveExperienceAction(expData: any, id?: string) {
  try {
    const supabase = createClient();
    let error;

    if (id) {
      const res = await supabase
        .from("experiences")
        .update(expData)
        .eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("experiences").insert(expData);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/experience");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================================================================
// 5. CERTIFICATES CRUD
// ============================================================================
export async function saveCertificateAction(certData: any, id?: string) {
  try {
    const supabase = createClient();
    let error;

    if (id) {
      const res = await supabase
        .from("certificates")
        .update(certData)
        .eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("certificates").insert(certData);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCertificateAction(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);
    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================================================================
// 6. EDUCATION CRUD
// ============================================================================
export async function saveEducationAction(eduData: any, id?: string) {
  try {
    const supabase = createClient();
    let error;

    if (id) {
      const res = await supabase
        .from("education")
        .update(eduData)
        .eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("education").insert(eduData);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/education");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteEducationAction(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/education");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ============================================================================
// 7. GALLERY CRUD
// ============================================================================
export async function saveGalleryAction(itemData: any, id?: string) {
  try {
    const supabase = createClient();
    let error;

    if (id) {
      const res = await supabase.from("gallery").update(itemData).eq("id", id);
      error = res.error;
    } else {
      const res = await supabase.from("gallery").insert(itemData);
      error = res.error;
    }

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteGalleryAction(id: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
