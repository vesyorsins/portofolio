import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID (Slug)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "serial", title: "Serial Label", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Full-Stack Web", value: "Full-Stack Web" },
          { title: "Cloud & DevOps", value: "Cloud & DevOps" },
          { title: "Cybersecurity", value: "Cybersecurity" },
          { title: "Machine Learning & AI", value: "Machine Learning & AI" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "metrics", title: "Metrics", type: "string" }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "demo", title: "Demo URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
    defineField({
      name: "telemetry",
      title: "Telemetry",
      type: "object",
      fields: [
        defineField({ name: "status", title: "Status", type: "string" }),
        defineField({ name: "rps", title: "RPS", type: "string" }),
        defineField({ name: "p99", title: "P99", type: "string" }),
        defineField({
          name: "pipeline",
          title: "Pipeline Nodes",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "type", title: "Type", type: "string" }),
                defineField({ name: "latency", title: "Latency", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
