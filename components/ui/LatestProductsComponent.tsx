"use client";

/**
 * LatestProductsComponent
 *
 * Displays a list of products filtered by tag ("New Arrival", "Best Seller", "Special Offer").
 * Users can click on a tag to filter the products shown. Each tag also displays the count of products in that category.
 *
 * Props:
 * - products: Array of product objects. Each product should have a `tags` array and an `id` property.
 *
 * Usage:
 * <LatestProductsComponent products={productsArray} />
 */

import React, { useMemo, useState } from "react";
import LatestProductCard from "./LatestProductCard";

const LatestProductsComponent = ({ products }: { products: any[] }) => {
  // State to track the currently selected tag
  const [currentTag, setCurrentTag] = useState("newArrival");

  // Memoized filtered products based on the current tag
  const data = useMemo(() => {
    return products.filter((product) => product.tags.includes(currentTag));
  }, [products, currentTag]);

  // Memoized counts for each tag category
  const bestSellerLength = useMemo(() => {
    return products.filter((product) => product.tags.includes("bestSeller"))
      .length;
  }, [products]);

  const newArrivalLength = useMemo(() => {
    return products.filter((product) => product.tags.includes("newArrival"))
      .length;
  }, [products]);

  const specialOfferLength = useMemo(() => {
    return products.filter((product) => product.tags.includes("specialOffer"))
      .length;
  }, [products]);

  // Handler for tag click
  const handleTagClick = (tag: string) => {
    setCurrentTag(tag);
  };

  return (
    <>
      {/* Tag selector with counts */}
      <div className="flex gap-6 max-md:gap-2 text-sm font-mono text-p2 w-full justify-center items-center">
        {[
          { name: "New Arrival", tagName: "newArrival" },
          { name: "Best Seller", tagName: "bestSeller" },
          { name: "Special Offer", tagName: "specialOffer" },
        ].map((tag, index) => (
          <span
            key={tag.name}
            className={`cursor-pointer hover:text-p1 font-sans text-xs  ${currentTag === tag.tagName ? "underline text-p4" : ""}`}
            onClick={() => handleTagClick(tag.tagName)}
            style={{ wordSpacing: "0.05rem" }}
          >
            {tag.name}{" "}
            <span className="text-p4">
              {"("}
              {tag.tagName === "newArrival"
                ? newArrivalLength
                : tag.tagName === "bestSeller"
                  ? bestSellerLength
                  : specialOfferLength}
              {") "}
            </span>
          </span>
        ))}
      </div>
      {/* Product cards */}
      <div className="flex flex-wrap gap-0 w-full max-w-6xl md:px-12 justify-center items-center">
        {data &&
          data.map((item) => (
            <LatestProductCard key={item.id} product={item} />
          ))}
      </div>
    </>
  );
};

export default LatestProductsComponent;
