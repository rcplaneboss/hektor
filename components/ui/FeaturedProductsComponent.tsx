"use client";
import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import FeaturedProductCard from "./FeaturedProductCard";
import { useMediaQuery } from "react-responsive";
import { useMemo } from "react";

type Props = {
  data: FEATUREDPRODUCTS_QUERYResult;
};

const FeaturedProductComponents = ({ data }: Props) => {
  const content = data[0]?.products;

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallDevice = useMediaQuery({ query: "(max-width: 640px)" });
  const productVisiblePerScroll = isSmallDevice ? 2 : isMobile ? 3 : 5;


  const scrollIndicators = useMemo(() => {
    if (!content) return [];
    const total = Math.ceil(content.length / productVisiblePerScroll);
    console.log(total);
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [content, productVisiblePerScroll]);

  if (!content || content.length === 0) return null;

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center gap-8 ${
          data.layoutStyle === "grid"
            ? "flex-wrap"
            : "flex-nowrap no-scrollbar overflow-auto"
        }`}
      >
        {content.map((item) => (
          <FeaturedProductCard key={item._id} data={item} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-2 h-6">
        {scrollIndicators.map((number) => (
          <div className="h-0.5 w-3 bg-p2" key={number}></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponents;
