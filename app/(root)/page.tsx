import React from "react";
import HomeBanner from "@/components/HomeBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import LatestProducts from "@/components/LatestProducts";
import FeaturesHomeSection from "@/components/FeaturesHomeSection";

export default function Home() {
  return (
    <main className="w-full bg-gray-50">
      <HomeBanner />
      <FeaturedProducts />
      <LatestProducts />
      <FeaturesHomeSection />
    </main>
  );
}
