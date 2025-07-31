"use client";

import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import FeaturedProductCard from "./FeaturedProductCard";
import { useMediaQuery } from "react-responsive";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  data: FEATUREDPRODUCTS_QUERYResult;
};

const FeaturedProductComponents = ({ data }: Props) => {
  const content = data[0]?.products;

  const [currentGroup, setCurrentGroup] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallDevice = useMediaQuery({ query: "(max-width: 640px)" });
  const productVisiblePerScroll = isSmallDevice ? 2 : isMobile ? 3 : 5;

  // Total number of groups (pages)
  const totalGroups = useMemo(() => {
    return content ? Math.ceil(content.length / productVisiblePerScroll) : 0;
  }, [content, productVisiblePerScroll]);

  // Indicator bar
  const scrollIndicators = useMemo(() => {
    return Array.from({ length: totalGroups }, (_, i) => i);
  }, [totalGroups]);

  if (!content || content.length === 0) return null;

  const scrollToGroup = (groupIndex: number) => {
    const firstItemIndex = groupIndex * productVisiblePerScroll;
    const targetEl = itemRefs.current[firstItemIndex];

    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
      setCurrentGroup(groupIndex);
    }
  };

  const scrollPrev = () => {
    const prevGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1;
    scrollToGroup(prevGroup);
  };

  const scrollNext = () => {
    const nextGroup = (currentGroup + 1) % totalGroups;
    scrollToGroup(nextGroup);
  };

  return (
    <div className="w-full relative z-0">
     
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

      <div
        className={`w-full flex items-center gap-8 ${
          data.layoutStyle === "grid"
            ? "flex-wrap"
            : "flex-nowrap no-scrollbar overflow-auto"
        }`}
      >
        {content.map((item, index) => (
          <div
            key={item._id}
            ref={(el) => (itemRefs.current[index] = el)}
            className="min-w-[200px] flex-shrink-0"
          >
            <FeaturedProductCard data={item} />
          </div>
        ))}
      </div>


      <div className="w-full flex justify-center items-center gap-2 h-6 mt-4">
        {scrollIndicators.map((groupIndex) => (
          <div
            key={groupIndex}
            className={`h-1 w-3 rounded-full cursor-pointer ${
              groupIndex === currentGroup ? "bg-p2" : "bg-gray-300"
            }`}
            onClick={() => scrollToGroup(groupIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponents;
