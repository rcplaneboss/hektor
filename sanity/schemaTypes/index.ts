import { type SchemaTypeDefinition } from 'sanity'
import { product } from "./product";
import { category } from "./category";
import { homeBanner } from "./homeBanner";
import { featuredProducts } from "./featuredProducts";
import { testimonial } from "./testimonial";
import { blogPost } from "./blogPost";
import { page } from "./page";
import { siteSettings } from "./siteSettings";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ product, category, homeBanner, featuredProducts, testimonial, blogPost, page, siteSettings ],
}
