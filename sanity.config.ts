"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { projectId, dataset, apiVersion } from "@/sanity/client";

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio CMS",
  projectId: projectId || "sample-project-id",
  dataset: dataset || "production",
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
