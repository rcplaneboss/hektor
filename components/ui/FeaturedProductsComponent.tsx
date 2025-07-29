"use client";
import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import FeaturedProductCard from "./FeaturedProductCard";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";

type Props = {
  data: FEATUREDPRODUCTS_QUERYResult;
};

const FeaturedProductComponents = ({ data }: Props) => {
 const content = data[0]?.products;

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });
  const containerRef = useRef(null);

  const numberOfFeaturedProducts = content?.length;
  const productVisiblePerScroll = isMobile ? 5 : isDesktop ? 3 : 2;
  const numberOfScroll = numberOfFeaturedProducts! / productVisiblePerScroll;
  const arrayOfScroll: number[] = [];


  for (let i = 0; i <= numberOfScroll; i++) {
      arrayOfScroll.push(i + 1);
  }
  
  console.log(arrayOfScroll)

 
  console.log(content?.length);
  return (
    <div className="w-full ">
      <div
        className={`w-full flex items-center gap-8 ${data.layoutStyle === "grid" ? "flex-wrap" : "flex-nowrap no-scrollbar overflow-auto"}`}
      >
        {content?.map((item) => (
          <FeaturedProductCard key={item._id} data={item} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        {arrayOfScroll.map((number) => (
          <div className="h-.5 w-1 bg-p2 p-1" key={number}></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductComponents;
