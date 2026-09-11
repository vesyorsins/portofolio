import PortfolioApp from "@/components/PortfolioApp";
import {
  getSiteSettings,
  getAwards,
  getCertificates,
  getExperiences,
  getSkills,
} from "@/sanity/dataProvider";

// Revalidate data periodically (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch all live CMS data in parallel with automatic fallback to static defaults
  const [settings, awards, certificates, experiences, skills] = await Promise.all([
    getSiteSettings(),
    getAwards(),
    getCertificates(),
    getExperiences(),
    getSkills(),
  ]);

  return (
    <PortfolioApp
      initialData={{
        settings,
        awards,
        certificates,
        experiences,
        skills,
      }}
    />
  );
}
