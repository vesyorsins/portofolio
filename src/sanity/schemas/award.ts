import { defineField, defineType } from "sanity";

export const award = defineType({
  name: "award",
  title: "Award / Championship",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number", type: "string", validation: (r) => r.required() }),
    defineField({ name: "badge", title: "Badge Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "stats", title: "Stats", type: "string" }),
    defineField({ name: "bullets", title: "Bullet Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "badge" },
  },
});
