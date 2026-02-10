import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "coverImage",
    },
    prepare({ title, category, media }) {
      return {
        title: title || "Untitled Post",
        subtitle: category || "Uncategorized",
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Full article body text",
      type: "text",
      rows: 20,
      validation: (rule) => rule.required().min(100),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Process",
          "Feasibility",
          "Budget",
          "Design",
          "Regulations",
          "Landscape",
          "Construction",
          "Sustainability",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      type: "string",
      description: 'Estimated read time, e.g. "6 min read"',
    }),
    defineField({
      name: "coverImage",
      type: "image",
      description: "Cover image for the blog post",
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
      description: "Tags for categorization and filtering",
    }),
  ],
});
