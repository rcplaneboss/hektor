import { client } from "@/sanity/lib/client";
import { featuredProducts as featuredProductsType } from "@/sanity/schemaTypes/featuredProducts";

const FeaturedProducts = async() => {
    // const featuredproducts = await client.fetch();
  return (
    <section className="flex justify-center items-center py-16">
      <div className="flex  justify-center items-center">
        <div className="font-sans text-3xl text-p1 font-semibold">Featured Products</div>

              <div className="flex items-center justify-center">
                  
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
