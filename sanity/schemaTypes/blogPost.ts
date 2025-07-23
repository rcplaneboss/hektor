import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
      defineField({
          name: "title",
          title: "Title",
          type: "string"
      }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
      defineField({
          name: "coverImage",
          title: "Cover Image", type: "image"
      }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
      defineField({
          name: "author",
          title: "Author",
          type: "string"
      }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
