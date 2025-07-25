"use client";

import { useEffect, useState, useRef } from "react";
import { HOMEBANNER_QUERYResult } from "../../sanity.types";
import { Button } from "./button";
import gsap from "gsap";

type Props = {
  content: HOMEBANNER_QUERYResult;
};

const HomeBannerContent = ({ content }: Props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const totalBanner = content.length;
  const bannerRef = useRef(null);

  useEffect(() => {
    if (totalBanner === 0) return;
    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % totalBanner);
    }, 5000);

    const handleVisibilityChange = () => {
      if (document.visibilityState == 'visible') {
        clearInterval(interval);
        
        setCurrentItem((prev) => (prev + 1) % totalBanner);

         setInterval(() => {
           setCurrentItem((prev) => (prev + 1) % totalBanner);
         }, 5000);
      }
    }

    document.addEventListener('visibilityChange', handleVisibilityChange);
    
    
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    return () => clearInterval(interval);
  }, [totalBanner]);

  useEffect(() => {
    if (bannerRef.current) {
      gsap.from(bannerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [currentItem]);

  if (!content.length) return null;

  const { _id, title, subtitle, buttonLink, buttonText, image, discount } =
    content[currentItem];

  return (
    <div ref={bannerRef} className="h-full">
      <div className="flex max-md:flex-col items-center justify-between h-full w-full gap-12 items banner-content opacity-100 max-md:px-2">
        <div className="flex flex-col gap-y-4 w-[26rem] max-md:w-full max-md:h-[50vh]">
          <small className="text-p7">Shop for best qualities....</small>

          <div>
            <span className="text-4xl lg:text-4xl text-black font-sans">
              {title}
            </span>
          </div>

          <div className="font-mono w-96 max-md:w-full text-sub-text">
            <small>{subtitle}</small>
          </div>

          <div>
            <Button className="rounded-xs cursor-pointer bg-p6">
              {buttonText}
            </Button>
          </div>
        </div>

        <div className="w-[350px] h-[350px] relative max-md:w-[300px] max-md:h-[300px] max-md:-ml-5">
          <img
            src="/images/ellipse1.png"
            className="absolute -top-8 -right-4 w-full h-full z-0"
            alt="ellipse1"
          />
          <img
            src="/images/ellepse2.png"
            className="absolute top-0 left-0 w-full h-full z-0"
            alt="ellipse2"
          />

          <img
            src={image?.asset?.url}
            className="relative w-full h-full z-10 object-cover"
            alt="banner"
          />

          {discount && (
            <div className="flex justify-center items-center z-20 absolute top-0 -right-8 max-md:right-1 max-md:-top-12 max-md:w-20 max-md:h-20 w-24 h-24">
              <img
                src="/images/vector-14.png"
                className="relative"
                alt="vector"
              />
              <div className="text-2xl max-md:text-xl font-sans absolute text-white">
                <div>{discount}%</div>
                <div>off</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center absolute bottom-0 right-0 w-full h-8 gap-2">
          {content.map((item) => (
            <div
              key={item._id}
              className={`w-2 h-2 rotate-45 border-2 border-p7 ${item._id == _id ? "bg-p7" : "bg-white"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBannerContent;
