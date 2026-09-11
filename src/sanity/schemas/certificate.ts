import { defineField, defineType } from "sanity";

export const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string" }),
    defineField({
      name: "imageAsset",
      title: "Certificate Image (Direct File Upload)",
      type: "image",
      description: "Upload certificate image directly from your computer",
      options: { hotspot: true },
    }),
    defineField({ name: "image", title: "Certificate Image URL (Optional fallback)", type: "url" }),
    defineField({
      name: "row",
      title: "Display Row",
      type: "number",
      description: "Which carousel row this cert belongs to (1, 2, or 3)",
      options: { list: [{ title: "Row 1", value: 1 }, { title: "Row 2", value: 2 }, { title: "Row 3", value: 3 }] },
      validation: (r) => r.required().min(1).max(3),
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "issuer" },
  },
});
