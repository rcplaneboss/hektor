"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useEffect } from "react"
import gsap from "gsap"

const Header = () => {
  const pathname = usePathname();
  const mainRef = useRef(null);

  useEffect(() => {
  const ctx =  gsap.context(() => {
      gsap.from(mainRef, {
        x: -300,
        opacity: 0.2,
        duration: .5,
      })
    }, mainRef)

    return ctx.revert();
  }, [pathname])


  pathname.split("/").unshift("");
  const pathArray: string[] = pathname.split("/");

  return (
    <section className="flex items-center font-sans py-16 bg-gray-100">
      <main className="px-8  md:pl-36 lg:pl-56" ref={mainRef}>
        <div className="text-3xl text-p1">
          {pathArray[pathArray.length - 1].includes("-")
            ? pathArray[pathArray.length - 1]
                .split("-")
                .map((word, index) => (
                  <span key={index}>
                    {index == 0
                      ? word.charAt(0).toUpperCase() + word.slice(1)
                      : " " + word.charAt(0).toUpperCase() + word.slice(1)}
                  </span>
                ))
            : pathArray[pathArray.length - 1].charAt(0).toUpperCase() +
              pathArray[pathArray.length - 1].slice(1)}
        </div>
        {pathArray.map((word, ind) => (
          <span className="text-p2" key={ind}>
            {ind == 0
              ? word.charAt(0).toUpperCase() + word.slice(1)
              : word.includes("-")
              ? word
                  .split("-")
                  .map((w, i) => (
                    <span key={i}>
                      {i == 0
                        ? " . " + w.charAt(0).toUpperCase() + w.slice(1)
                        : "  " + w.charAt(0).toUpperCase() + w.slice(1)}
                    </span>
                  ))
                : <span className="!text-p1">{" . " + word.charAt(0).toUpperCase() + word.slice(1)}</span>}
          </span>
        ))}
      </main>
    </section>
  );
};
export default Header;
