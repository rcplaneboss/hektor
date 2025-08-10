import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import React from "react";

const LatestProductCard = ({ product }: { product: any }) => {
  const { _id, title, discount, mainImageUrl } = product;
  return (
    <div className="w-70 flex flex-col items-center justify-center p-6 h-66 group relative">
    
      <div className="bg-gray-100 w-full h-full flex items-center justify-center relative group-hover:bg-white transition-colors duration-300">
        <div className="absolute -left-6 w-13 -rotate-[30deg] -top-4 group-hover:block hidden">
          <span className="text-white -rotate-[16deg] relative top-6 left-4 text-sm font-sans block">
            new
          </span>
        <img src="/images/sale-tag.png" className="w-full h-full" alt="Sale" />
       </div>
        <div className="hidden group-hover:flex group-hover:flex-col justify-start w-full absolute bottom-6 left-0 py-[10px] pl-2 gap-[1px] z-20 ">
          <div className="hover:bg-gray-300 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center">
            <ShoppingCart color="blue" className="w-3.5 h-3.5" />
          </div>

          <div className="hover:bg-gray-300 cursor-pointer rounded-full  w-8 h-8 flex items-center justify-center">
            <Heart color="blue" className="w-3.5 h-3.5" />
          </div>

          <div className="hover:bg-gray-300 cursor-pointer rounded-full  w-8 h-8 flex items-center justify-center">
            <ZoomIn color="blue" className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="w-36 flex items-center justify-center">
          <img src={mainImageUrl} />
        </div>
      </div>

      <div className="flex justify-between w-full py-2">
        <h3 className="text-[0.69rem] text-p2 font-sans">{title}</h3>
        <div className="flex w-1/3">
          <span
            className={`text-[0.69rem] text-p2 font-sans ${discount && "line-through"}`}
          >
            $48.00
          </span>
          {discount && (
            <span className="text-[0.6rem] text-p4 font-sans ml-2">
              ${Math.ceil((discount / 100) * 48.0)}.00
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
