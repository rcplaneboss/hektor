import { FEATUREDPRODUCTS_QUERYResult } from "@/sanity.types";
import FeaturedProductCard from "./FeaturedProductCard";

type Props = {
  data: FEATUREDPRODUCTS_QUERYResult;
};

const FeaturedProductComponents = ({ data }: Props) => {
  const content = data[0]?.products;
  console.log(content?.length); 
  return (
    <div className="w-full flex justify-center items-center gap-8 flex-wrap ">
      {content?.map((item) => (
        <FeaturedProductCard key={item._id} data={item} />
      ))}
    </div>
  );
};

export default FeaturedProductComponents;
