import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import Link from "next/link";

type data = {
  _id: string;
  title: string | null;
  discount: null;
  discountCode: null;
  mainImageUrl: string | null;
};

const FeaturedProductCard = ({ data }: { data: data }) => {
  return (
      <div className="flex flex-col h-60 w-44 group relative shadow-sm">
          
      <div className="hidden group-hover:flex justify-start w-full  absolute top-0 pt-[5px] pl-2 z-20">
        <div className="p-1 group-hover:hover:bg-gray-300 cursor-pointer rounded-full">
          <ShoppingCart color="blue" className="w-3.5 h-3.5" />
        </div>

        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded-full">
          <Heart color="blue" className="w-3.5 h-3.5" />
        </div>

        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded-full">
          <ZoomIn color="blue" className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="w-full h-3/5 flex  justify-center items-center relative bg-gray-50">
        <img src={data.mainImageUrl} className="w-28 h-28 object-cover " />
        <div className=" justify-center items-center w-full text-[10px] hidden group-hover:flex absolute bottom-0 transition-all duration-500">
          <Link
            href={`/home/pages/product-details/${data._id ?? ""}`}
            className="p-1 bg-green-500 font-mono text-white"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="flex felx-col gap-2 group-hover:bg-p2 justify-center items-center h-2/5">
        <div className="font-sans text-xs group-hover:bg-p2 line-clamp-2 group-hover:text-white w-full px-1 text-center">
          {data.title}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
