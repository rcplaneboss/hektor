import { defineField, defineType } from "sanity";

export const homeBanner = defineType({
  name: "homeBanner",
  title: "Homepage Banner",
  type: "document",
  fields: [
      defineField({
          name: "title",
          title: "Title"
          , type: "string"
      }),
      defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string"
      }),
      defineField({
        name: "discount",
        title: "Discount",
        type: "number"
      }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
      defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string"
      }),
      defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "url"
      }),
    defineField({
      name: "isActive",
      title: "Active?",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
