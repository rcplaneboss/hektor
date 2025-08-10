import React from "react";
import LatestProductsComponent from "./ui/LatestProductsComponent";
import { LATESTPRODUCTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { AlertTriangle } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

const LatestProducts = async () => {
  const latestProducts: any = await client.fetch(LATESTPRODUCTS_QUERY);
  console.log("Latest Products:", latestProducts);
  return (
    <div className="flex flex-col items-center justify-center max-md:px-16 py-12 px-20 max-md:10 w-screen">
      <div className="flex flex-col items-center justify-center w-full">
        <SectionTitle title="Latest Products" />

        {latestProducts.length > 0 ? (
          <div className="flex flex-col gap-8 w-full mt-8 md:px-12 justify-center items-center">
            <LatestProductsComponent products={latestProducts} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-16">
            <AlertTriangle color="blue" className="w-16 h-16" />
            <div className="text-2xl text-p4">
              Oops! we have no latest products right now!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
