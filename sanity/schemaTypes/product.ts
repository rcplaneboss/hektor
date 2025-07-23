import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required().error("Slug is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required().error("Description is required"),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
    }),
    defineField({
      name: "images",
      title: "images",
      type: "array",
      of: [{ type: "image" }],
      validation: (rule) =>
        rule.required().error("At least one image is required"),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required().error("Category is required"),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Features",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specifications",
      type: "array",
      title: "Specifications",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", type: "string", title: "Spec Name" },
            { name: "value", type: "string", title: "Spec Value" },
          ],
        },
      ],
    }),
      defineField({  
        name: "isFeatured",
          title: "Is Featured",
          type: "boolean",
          initialValue: false,
      }),
      defineField({
          name: "discount",
          title: "Discount",
          type: "string",
        }),
      defineField({
          name: "discountCode",
          title: "Discount Code",
          type: "string",
          hidden: ({ parent })=> !parent?.discount,
        }),
      defineField({
          name: "supabaseProductId",
          title: "Supabase Product ID",
          type: "string",
          validation: (rule) => rule.required().error("Supabase Product ID is required"),
        }),
  ],
});