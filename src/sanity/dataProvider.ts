import { defaultSiteSettings } from "@/data/siteSettings";
import { championshipCards } from "@/data/awards";
import { row1Certificates, row2Certificates, row3Certificates } from "@/data/certifications";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import {
  fetchSiteSettings,
  fetchAwards,
  fetchCertificates,
  fetchExperiences,
  fetchSkillCategories,
} from "./queries";
import {
  SiteSettings,
  StatMetric,
  ChampionshipCard,
  ExperienceItem,
  SkillCategory,
} from "@/types/portfolio";
import { CertificatePhoto } from "@/data/certifications";

export async function getSiteSettings(): Promise<SiteSettings> {
  const cmsData = await fetchSiteSettings();
  if (cmsData && cmsData.name) {
    const validStats: StatMetric[] = Array.isArray(cmsData.stats)
      ? cmsData.stats.filter(
          (st: StatMetric | null | undefined): st is StatMetric =>
            Boolean(st && st.label && st.value)
        )
      : [];

    const validRoles = Array.isArray(cmsData.specializingRoles)
      ? cmsData.specializingRoles.filter(
          (r: string | null | undefined): r is string => Boolean(r && r.trim())
        )
      : [];

    const validJackPills = Array.isArray(cmsData.jackPills)
      ? cmsData.jackPills.filter(
          (p: string | null | undefined): p is string => Boolean(p && p.trim())
        )
      : [];

    return {
      ...defaultSiteSettings,
      ...cmsData,
      specializingRoles:
        validRoles.length > 0
          ? validRoles
          : defaultSiteSettings.specializingRoles,
      jackPills:
        validJackPills.length > 0
          ? validJackPills
          : defaultSiteSettings.jackPills,
      stats:
        validStats.length > 0 ? validStats : defaultSiteSettings.stats,
      marqueeLine1: cmsData.marqueeLine1 || defaultSiteSettings.marqueeLine1,
      marqueeLine2: cmsData.marqueeLine2 || defaultSiteSettings.marqueeLine2,
      manifestoText: cmsData.manifestoText || defaultSiteSettings.manifestoText,
    };
  }
  return defaultSiteSettings;
}

export async function getAwards(): Promise<ChampionshipCard[]> {
  const cmsData = await fetchAwards();
  if (cmsData && Array.isArray(cmsData) && cmsData.length > 0) {
    return cmsData;
  }
  return championshipCards;
}

export async function getCertificates(): Promise<{
  row1: CertificatePhoto[];
  row2: CertificatePhoto[];
  row3: CertificatePhoto[];
}> {
  const cmsData = await fetchCertificates();
  if (
    cmsData &&
    (cmsData.row1?.length > 0 || cmsData.row2?.length > 0 || cmsData.row3?.length > 0)
  ) {
    return {
      row1: cmsData.row1?.length > 0 ? cmsData.row1 : row1Certificates,
      row2: cmsData.row2?.length > 0 ? cmsData.row2 : row2Certificates,
      row3: cmsData.row3?.length > 0 ? cmsData.row3 : row3Certificates,
    };
  }
  return {
    row1: row1Certificates,
    row2: row2Certificates,
    row3: row3Certificates,
  };
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  const cmsData = await fetchExperiences();
  if (cmsData && Array.isArray(cmsData) && cmsData.length > 0) {
    return cmsData;
  }
  return experiences;
}

export async function getSkills(): Promise<SkillCategory[]> {
  const cmsData = await fetchSkillCategories();
  if (cmsData && Array.isArray(cmsData) && cmsData.length > 0) {
    return cmsData;
  }
  return skillCategories;
}
