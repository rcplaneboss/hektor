import { HOMEBANNER_QUERYResult, } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { HOMEBANNER_QUERY } from "@/sanity/lib/queries";
import HomeBannerContent from "./ui/HomeBannerContent";



const HomeBanner = async () => {
  const bannerData : HOMEBANNER_QUERYResult = await client.fetch(HOMEBANNER_QUERY);

  return (
    <section className="px-8 py-16 md:px-50 md:py-24 bg-gray-100 w-screen h-fit lg:h-[70vh] flex  items-center justify-center overflow-hidden relative">

       <div className="absolute left-10 -top-4 w-60 h-60 max-md:h-[600px] max-md:top-10 max-md:hidden">
        <img src="/images/lamp-image.png" alt="lamp image" />
      </div>

     <HomeBannerContent content={bannerData} />
    </section>
  );
};

export default HomeBanner;
