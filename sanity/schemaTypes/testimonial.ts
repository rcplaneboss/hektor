import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
      defineField({
          name: "name",
          title: "Name",
          type: "string"
      }),
      defineField({
          name: "image",
          title: "Customer Image",
          type: "image"
      }),
      defineField({
          name: "reviewText",
          title: "Review", type: "text"
      }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title / Label",
      type: "string",
    }),
  ],
});
