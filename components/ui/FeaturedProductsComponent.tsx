"use client";

/**
 * FeaturedProductComponents
 *
 * This component displays a horizontally scrollable (or grid) list of featured products,
 * with navigation arrows and indicator dots for paging through product groups.
 * The number of visible products per scroll adapts to the screen size.
 *
 * Props:
 * - data: FEATUREDPRODUCTS_QUERYResult (array with a `products` array and `layoutStyle`)
 *
 * Features:
 * - Responsive: Shows 1, 3, or 5 products per scroll depending on device width.
 * - Navigation: Left/right arrows to scroll between groups of products.
 * - Indicator: Dots below the product list show the current group/page.
 * - Supports both grid and horizontal scroll layouts.
 */

import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import FeaturedProductCard from "./FeaturedProductCard";
import { useMediaQuery } from "react-responsive";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  data: FEATUREDPRODUCTS_QUERYResult;
};

const FeaturedProductComponents = ({ data }: Props) => {
  // Extract the products array from the first item in the data array
  const content = data[0]?.products;

  // State to track the current group/page of products being viewed
  const [currentGroup, setCurrentGroup] = useState(0);

  // Refs to each product card for scrolling
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive breakpoints for number of visible products
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallDevice = useMediaQuery({ query: "(max-width: 640px)" });
  const productVisiblePerScroll = isSmallDevice ? 1 : isMobile ? 3 : 5;

  // Calculate total number of groups/pages
  const totalGroups = useMemo(() => {
    return content ? Math.ceil(content.length / productVisiblePerScroll) : 0;
  }, [content, productVisiblePerScroll]);

  // Create an array for indicator dots
  const scrollIndicators = useMemo(() => {
    return Array.from({ length: totalGroups }, (_, i) => i);
  }, [totalGroups]);

  // If there are no products, render nothing
  if (!content || content.length === 0) return null;

  /**
   * Scroll to a specific group/page of products.
   * @param groupIndex Index of the group to scroll to.
   */
  const scrollToGroup = (groupIndex: number) => {
    const firstItemIndex = groupIndex * productVisiblePerScroll;
    const targetEl = itemRefs.current[firstItemIndex];

    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setCurrentGroup(groupIndex);
    }
  };

  /** Scroll to the previous group/page. */
  const scrollPrev = () => {
    const prevGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1;
    scrollToGroup(prevGroup);
  };

  /** Scroll to the next group/page. */
  const scrollNext = () => {
    const nextGroup = (currentGroup + 1) % totalGroups;
    scrollToGroup(nextGroup);
  };

  return (
    <div className="w-full relative z-0">
      {/* Navigation arrows */}
      <div className="flex absolute top-1/2 w-full justify-between items-center -translate-y-1/2 z-20 px-4">
        <div
          className="w-8 h-8 bg-gray-400 cursor-pointer flex justify-center items-center rounded-full"
          onClick={scrollPrev}
        >
          <ChevronLeft />
        </div>
        <div
          className="w-8 h-8 bg-gray-400 cursor-pointer flex justify-center items-center rounded-full"
          onClick={scrollNext}
        >
          <ChevronRight />
        </div>
      </div>

      {/* Product cards list */}
      <div
        className={`w-full flex items-center gap-4 ${
          data.layoutStyle === "grid"
            ? "flex-wrap"
            : "flex-nowrap no-scrollbar overflow-auto"
        }`}
      >
        {content.map((item, index) => (
          <div
            key={item._id}
            ref={(el) => (itemRefs.current[index] = el)}
            className="min-w-44 flex-shrink-0"
          >
            <FeaturedProductCard data={item} />
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="w-full flex justify-center items-center gap-1 h-6 mt-4">
        {scrollIndicators.map((groupIndex) => (
          <div
            key={groupIndex}
            className={`h-1  bg-gray-300 rounded-full cursor-pointer ${
              groupIndex === currentGroup ? "w-4 !bg-black/[0.6]" : "w-3 "
            }`}
            onClick={() => scrollToGroup(groupIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponents;
