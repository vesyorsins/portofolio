import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site & Hero Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Engineer Name",
      type: "string",
      initialValue: "Vesyorsins",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      title: "Hero Main Headline",
      type: "string",
      initialValue: "Engineering scalable web systems with precision & motion.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "specializingRoles",
      title: "Rotating Specializations / Roles",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Full-Stack Software Engineer",
        "Security & Penetration Tester",
        "DevOps & Cloud Architect",
        "AI Systems & Machine Learning",
      ],
    }),
    defineField({
      name: "bio",
      title: "Hero Bio Paragraph",
      type: "text",
      initialValue:
        "Building production software at the intersection of robust backend architectures, interactive 3D WebGL interfaces, and performance-focused frontend engineering.",
    }),
    defineField({
      name: "directEmail",
      title: "Direct Transmission Email",
      type: "string",
      initialValue: "hello@vesyorsins.dev",
    }),
    defineField({
      name: "avatarPhoto",
      title: "Hero Portrait Photo (Direct File Upload)",
      type: "image",
      description: "Upload your portrait photo directly from your computer (PNG, JPG, WebP)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "avatarImage",
      title: "Hero Portrait Photo URL (Optional fallback)",
      type: "url",
      description: "Or paste an external image URL (e.g. Unsplash or Imgur) if not uploading a file directly",
    }),
    defineField({
      name: "location",
      title: "Location Tag",
      type: "string",
      initialValue: "JAKARTA, ID",
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      initialValue: "UTC+7",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status Badge",
      type: "string",
      initialValue: "AVAILABLE FOR WORK",
    }),
    defineField({
      name: "specBadge",
      title: "Card Bottom Spec Badge",
      type: "string",
      initialValue: "FULL-STACK & SEC / TS CORE",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      initialValue: "https://github.com",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      initialValue: "https://linkedin.com",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter / X URL",
      type: "url",
      initialValue: "https://twitter.com",
    }),
    defineField({
      name: "discordHandle",
      title: "Discord Handle",
      type: "string",
      initialValue: "vesyorsins#0001",
    }),
    defineField({
      name: "jackTitle",
      title: "Jack Card Title",
      type: "string",
      initialValue: "JACK OF ALL TRADES",
    }),
    defineField({
      name: "jackSubtitle",
      title: "Jack Card Subtitle",
      type: "string",
      initialValue: "MASTER OF SYSTEMS",
    }),
    defineField({
      name: "jackQuote",
      title: "Jack Card Quote",
      type: "text",
      initialValue:
        "A jack of all trades is a master of none, but oftentimes better than a master of one.",
    }),
    defineField({
      name: "jackPills",
      title: "Jack Domain Pills",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Full-Stack Web", "AI & Security", "DevOps Cloud"],
    }),
    defineField({
      name: "stats",
      title: "HUD Stats Metrics (4 Items)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "subtext", title: "Subtext", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "marqueeLine1",
      title: "Velocity Marquee Ticker Line 1",
      type: "string",
      initialValue:
        "PRIMARY: TYPESCRIPT & PYTHON • RUNTIME: NODE.JS & BUN • DATABASE: POSTGRESQL & REDIS • CLOUD: AWS & VERCEL",
    }),
    defineField({
      name: "marqueeLine2",
      title: "Velocity Marquee Ticker Line 2",
      type: "string",
      initialValue:
        "NEXT.JS 16 • REACT 19 • TAILWIND CSS • WEBSOCKETS • PYTORCH • DOCKER • LINUX",
    }),
    defineField({
      name: "manifestoTag",
      title: "Manifesto Tag Badge",
      type: "string",
      initialValue: "[ MANIFESTO // ENGINEERING ETHOS ]",
    }),
    defineField({
      name: "manifestoText",
      title: "Manifesto Full Paragraph",
      type: "text",
      initialValue:
        "I believe exceptional software is forged at the intersection of mathematical rigor, performance optimization, and organic human motion. Every interface should feel weightless, responsive, and crafted with uncompromising attention to detail.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "headline" },
  },
});
