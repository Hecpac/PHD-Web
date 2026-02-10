import { defineField, defineType } from "sanity";

const dfwCityOptions = [
  "Dallas",
  "Fort Worth",
  "Plano",
  "Frisco",
  "McKinney",
  "Allen",
  "Irving",
  "Arlington",
  "Southlake",
  "Grapevine",
  "Colleyville",
  "Highland Park",
  "University Park",
  "Prosper",
  "Coppell",
  "Flower Mound",
];

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  preview: {
    select: {
      title: "title",
      city: "location.city",
      media: "heroImage",
    },
    prepare({ title, city, media }) {
      return {
        title: title || "Untitled Project",
        subtitle: city ? `${city}, DFW` : "DFW Metroplex",
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      type: "object",
      fields: [
        defineField({
          name: "city",
          type: "string",
          options: {
            list: dfwCityOptions.map((city) => ({ title: city, value: city })),
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "neighborhood",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "style",
      type: "string",
      options: {
        list: [
          "Modern",
          "Mediterranean",
          "Modern Farmhouse",
          "Transitional",
          "Contemporary",
          "Tudor Revival",
          "Craftsman",
          "Mid-Century Modern",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Detailed project description for the project detail page",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "specs",
      type: "object",
      fields: [
        defineField({ name: "sqft", type: "number" }),
        defineField({ name: "beds", type: "number" }),
        defineField({ name: "baths", type: "number" }),
        defineField({ name: "stories", type: "number" }),
      ],
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      type: "number",
      description: "Display order in the featured projects section (lower = first)",
      hidden: ({ parent }) => !parent?.isFeatured,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "heroImage",
      type: "image",
      description: "Dedicated hero image for the featured project card",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      description: 'Display tags such as "Modern", "4,200 sqft", "Prosper"',
    }),
  ],
});
