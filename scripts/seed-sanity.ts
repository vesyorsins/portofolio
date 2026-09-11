/**
 * Seed Script for Sanity.io CMS
 * 
 * Usage:
 * 1. Set your NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 * 2. Run: npm run sanity:seed
 */

import { createClient } from "@sanity/client";
import { defaultSiteSettings } from "../src/data/siteSettings";
import { projectsData } from "../src/data/projects";
import { championshipCards } from "../src/data/awards";
import { row1Certificates, row2Certificates, row3Certificates } from "../src/data/certifications";
import { experiences } from "../src/data/experience";
import { skillCategories } from "../src/data/skills";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set in .env.local to seed.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("🚀 Starting Sanity.io database seeding...");

  // 0. Seed Site & Hero Settings
  console.log("⚙️  Seeding global site & hero settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: defaultSiteSettings.name,
    headline: defaultSiteSettings.headline,
    specializingRoles: defaultSiteSettings.specializingRoles,
    bio: defaultSiteSettings.bio,
    directEmail: defaultSiteSettings.directEmail,
    avatarImage: defaultSiteSettings.avatarImage,
    location: defaultSiteSettings.location,
    timezone: defaultSiteSettings.timezone,
    availabilityStatus: defaultSiteSettings.availabilityStatus,
    specBadge: defaultSiteSettings.specBadge,
    githubUrl: defaultSiteSettings.githubUrl,
    linkedinUrl: defaultSiteSettings.linkedinUrl,
    twitterUrl: defaultSiteSettings.twitterUrl,
    discordHandle: defaultSiteSettings.discordHandle,
    jackTitle: defaultSiteSettings.jackTitle,
    jackSubtitle: defaultSiteSettings.jackSubtitle,
    jackQuote: defaultSiteSettings.jackQuote,
    jackPills: defaultSiteSettings.jackPills,
    stats: defaultSiteSettings.stats,
    marqueeLine1: defaultSiteSettings.marqueeLine1,
    marqueeLine2: defaultSiteSettings.marqueeLine2,
    manifestoTag: defaultSiteSettings.manifestoTag,
    manifestoText: defaultSiteSettings.manifestoText,
  });
  console.log("✅ Seeded site & hero settings.");

  // 1. Seed Projects
  console.log("📦 Seeding projects...");
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    await client.createOrReplace({
      _id: `project-${p.id}`,
      _type: "project",
      id: p.id,
      serial: p.serial,
      title: p.title,
      category: p.category,
      role: p.role,
      year: p.year,
      tagline: p.tagline,
      description: p.description,
      metrics: p.metrics,
      technologies: p.technologies,
      github: p.github,
      demo: p.demo,
      featured: p.featured,
      order: i + 1,
      telemetry: p.telemetry,
    });
  }
  console.log(`✅ Seeded ${projectsData.length} projects.`);

  // 2. Seed Awards
  console.log("🏆 Seeding awards & championships...");
  for (let i = 0; i < championshipCards.length; i++) {
    const a = championshipCards[i];
    await client.createOrReplace({
      _id: `award-${a.number}`,
      _type: "award",
      number: a.number,
      badge: a.badge,
      title: a.title,
      tagline: a.tagline,
      category: a.category,
      description: a.description,
      stats: a.stats,
      bullets: a.bullets,
      order: i + 1,
    });
  }
  console.log(`✅ Seeded ${championshipCards.length} awards.`);

  // 3. Seed Certificates
  console.log("📜 Seeding verified certificates...");
  const rows = [
    { rowNum: 1, list: row1Certificates },
    { rowNum: 2, list: row2Certificates },
    { rowNum: 3, list: row3Certificates },
  ];
  let certCount = 0;
  for (const { rowNum, list } of rows) {
    for (let i = 0; i < list.length; i++) {
      const c = list[i];
      certCount++;
      await client.createOrReplace({
        _id: `cert-r${rowNum}-${i + 1}`,
        _type: "certificate",
        title: c.title,
        issuer: c.issuer,
        image: c.image,
        row: rowNum,
        order: i + 1,
      });
    }
  }
  console.log(`✅ Seeded ${certCount} certificates.`);

  // 4. Seed Experience Milestones
  console.log("💼 Seeding professional experience...");
  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    await client.createOrReplace({
      _id: `experience-${i + 1}`,
      _type: "experience",
      period: exp.period,
      role: exp.role,
      company: exp.company,
      location: exp.location,
      type: exp.type,
      summary: exp.summary,
      achievements: exp.achievements,
      skills: exp.skills,
      order: i + 1,
    });
  }
  console.log(`✅ Seeded ${experiences.length} experience milestones.`);

  // 5. Seed Skills Matrix
  console.log("🧠 Seeding technical skill categories...");
  for (let i = 0; i < skillCategories.length; i++) {
    const s = skillCategories[i];
    await client.createOrReplace({
      _id: `skillCategory-${s.id}`,
      _type: "skillCategory",
      categoryId: s.id,
      title: s.title,
      iconName: s.iconName || "Code2",
      tagline: s.tagline,
      description: s.description,
      skills: s.skills,
      order: i + 1,
    });
  }
  console.log(`✅ Seeded ${skillCategories.length} skill categories.`);

  console.log("\n🎉 ALL PORTFOLIO DATA & SITE SETTINGS SUCCESSFULLY SEEDED TO SANITY.IO!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
