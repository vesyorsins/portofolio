import { defineField, defineType } from "sanity";

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill Category",
  type: "document",
  fields: [
    defineField({ name: "categoryId", title: "Category ID (slug)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "iconName",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Lucide icon component name: Code2, ShieldAlert, Server, Brain",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Skill Name", type: "string" }),
            defineField({ name: "level", title: "Proficiency Level (0-100)", type: "number" }),
            defineField({ name: "category", title: "Sub-category Label", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
