import { defineQuery } from "next-sanity";

export const HOMEBANNER_QUERY = defineQuery(`*[_type == "homeBanner"]{
  _id,
   title,
  subtitle,
  discount,
  image{
    asset->{
      _id,
      url,
      metadata { lqip }
    },
    alt
  },
  buttonText,
  buttonLink,
  isActive
}`);

export const FEATUREDPRODUCTS_QUERY =
  defineQuery(`*[_type == "featuredProducts"]{
  _id,
  title,
  layoutStyle,
  products->{
      shortDescription
  },
  image{
    asset->{
      _id,
      url,
      metadata { lqip }
    },
    alt
  }
}`);
