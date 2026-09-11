import { sanityClient, isSanityConfigured } from "./client";
import { urlForImage } from "./image";

// ─── GROQ Queries ────────────────────────────────────────────────────────────

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  name,
  headline,
  specializingRoles,
  bio,
  directEmail,
  avatarPhoto,
  avatarImage,
  location,
  timezone,
  availabilityStatus,
  specBadge,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  discordHandle,
  jackTitle,
  jackSubtitle,
  jackQuote,
  jackPills,
  stats[] { label, value, subtext },
  marqueeLine1,
  marqueeLine2,
  manifestoTag,
  manifestoText
}`;

const awardsQuery = `*[_type == "award"] | order(order asc) {
  number,
  badge,
  title,
  tagline,
  category,
  description,
  stats,
  bullets
}`;

const certificatesQuery = `*[_type == "certificate"] | order(order asc) {
  title,
  issuer,
  imageAsset,
  image,
  row
}`;

const experiencesQuery = `*[_type == "experience"] | order(order asc) {
  period,
  role,
  company,
  location,
  type,
  summary,
  achievements,
  skills
}`;

const skillCategoriesQuery = `*[_type == "skillCategory"] | order(order asc) {
  "id": categoryId,
  title,
  iconName,
  tagline,
  description,
  skills[] { name, level, category, description }
}`;

// ─── Fetch Helpers (returns null if Sanity is not configured) ─────────────────

export async function fetchSiteSettings() {
  if (!isSanityConfigured()) return null;
  try {
    const doc = await sanityClient.fetch(siteSettingsQuery);
    if (!doc) return null;

    // Resolve uploaded avatar photo to CDN URL if present
    const uploadedAvatarUrl = doc.avatarPhoto ? urlForImage(doc.avatarPhoto) : "";
    return {
      ...doc,
      avatarImage: uploadedAvatarUrl || doc.avatarImage,
    };
  } catch {
    return null;
  }
}

export async function fetchAwards() {
  if (!isSanityConfigured()) return null;
  try {
    return await sanityClient.fetch(awardsQuery);
  } catch {
    return null;
  }
}

interface RawCertificateDoc {
  title: string;
  issuer: string;
  imageAsset?: unknown;
  image?: string;
  row: number;
}

export async function fetchCertificates() {
  if (!isSanityConfigured()) return null;
  try {
    const all: RawCertificateDoc[] = await sanityClient.fetch(certificatesQuery);
    const resolved = all.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      image: (c.imageAsset ? urlForImage(c.imageAsset) : "") || c.image || "",
      row: c.row,
    }));
    return {
      row1: resolved.filter((c) => c.row === 1),
      row2: resolved.filter((c) => c.row === 2),
      row3: resolved.filter((c) => c.row === 3),
    };
  } catch {
    return null;
  }
}

export async function fetchExperiences() {
  if (!isSanityConfigured()) return null;
  try {
    return await sanityClient.fetch(experiencesQuery);
  } catch {
    return null;
  }
}

export async function fetchSkillCategories() {
  if (!isSanityConfigured()) return null;
  try {
    return await sanityClient.fetch(skillCategoriesQuery);
  } catch {
    return null;
  }
}
