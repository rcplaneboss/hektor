import { defineField, defineType } from "sanity";

export const featuredProducts = defineType({
  name: "featuredProducts",
  title: "Featured Product Section",
  type: "document",
  fields: [
      defineField({
          name: "title",
          title: "Section Title",
          type: "string"
      }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (rule) => rule.required().min(1).error("Select at least one product"),
    }),
    defineField({
      name: "layoutStyle",
      title: "Layout Style",
      type: "string",
      options: {
        list: ["grid", "carousel"],
        layout: "radio",
      },
    }),
  ],
});
