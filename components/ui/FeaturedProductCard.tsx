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

  const {_id,  title, discount, discountCode, mainImageUrl} = data;
  return (
    <div className="flex flex-col h-60 min-w-44 group relative shadow-xl flex-skrink-0">
      <div className="hidden group-hover:flex justify-start w-full absolute top-0 pt-[5px] pl-2 gap-[3px] z-20">
        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded-full">
          <ShoppingCart color="blue" className="w-3.5 h-3.5" />
        </div>

        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded-full">
          <Heart color="blue" className="w-3.5 h-3.5" />
        </div>

        <div className="p-1 hover:bg-gray-300 cursor-pointer rounded-full">
          <ZoomIn color="blue" className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="w-full h-[65%] flex  justify-center items-center relative bg-gray-50">
        <img src={mainImageUrl} className="w-28 h-28 object-cover " />
        <div className=" justify-center items-center w-full text-[10px] hidden group-hover:flex absolute bottom-3 transition-all duration-500">
          <Link
            href={`/home/pages/product-details/${_id ?? ""}`}
            className="p-1 bg-green-500 font-mono text-white"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 group-hover:bg-p2 justify-center items-center h-[35%] py-2">
        <div className="font-sans text-xs group-hover:bg-p2 line-clamp-2 text-p6 group-hover:text-white w-full px-1 text-center">
          {title}
        </div>

        <div className="flex justify-center items-center gap-1 w-9">
          <div className="w-3 h-0.5 bg-gray-300"></div>
          <div className="w-3 h-0.5 bg-p6"></div>
          <div className="w-3 h-0.5 bg-p3"></div>
        </div>

        {discount && (<div className="font-sans text-[10px] text-p2 group-hover:text-white">
          Code . {discountCode}
        </div>)}

        <div className="font-sans text-[10px] text-p2 group-hover:text-white">
          $48.00
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
