import React from 'react'
import SectionTitle from './ui/SectionTitle'


const features = [
    {
    title: "Fast Shipping",
        description: "Get your products delivered to your doorstep in record time.",
    image: "/images/free-delivery.png"
  },
  {
    title: "24/7 Support",
    description: "We're here to help you anytime, day or night.",
    image: "/images/support.png"
  },
  {
    title: "Easy Returns",
    description: "Not satisfied? Return your product hassle-free.",
    image: "/images/cashback.png"
  },
    {
      title: "Premium Quality",
        description: "We ensure the highest quality standards for all our products.",
      image: "/images/premium-quality.png"
  }
];

const FeaturesHomeSection = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 w-screen px-36 max-md:px-10">
      <SectionTitle title="What Shopex Offers!" />
      <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
        {features.map((feature, index) => (
          <div key={index} className="py-5 px-8 bg-white shadow-md flex flex-col items-center text-center gap-3 w-48 h-50">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-10 h-10 mt-2"
                />
                
            <h3 className="font-sans text-sm text-p1">{feature.title}</h3>
            <p className="text-gray-600 text-xs font-mono">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default FeaturesHomeSection
