import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { FEATUREDPRODUCTS_QUERY } from "@/sanity/lib/queries";
import FeaturedProductComponents from "./ui/FeaturedProductsComponent";
import { AlertTriangle } from "lucide-react";

const FeaturedProducts = async () => {
  const featuredproducts : FEATUREDPRODUCTS_QUERYResult = await client.fetch(
    FEATUREDPRODUCTS_QUERY
  );

  return (
    <section className="flex justify-center items-center py-16">
      <div className="flex flex-col justify-center items-center w-screen">
        <div className="font-sans text-3xl text-p1 font-semibold">
          Featured Products
        </div>

        {featuredproducts ? (
          <div className="flex items-center justify-center w-full px-44 max-md:px-30 py-12 max-sm:px-8">
            <FeaturedProductComponents data={featuredproducts} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-16">
            <AlertTriangle color="blue" className="w-16 h-16" />
            <div className="text-2xl text-p4">No Featured Product is avialable now!</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
