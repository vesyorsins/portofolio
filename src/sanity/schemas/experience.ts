import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "period", title: "Period", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Type (Full-Time / Contract / etc)", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "achievements", title: "Achievements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "skills", title: "Skills / Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
