import React from 'react'
import HomeBanner from '@/components/HomeBanner'
import FeaturedProducts from '@/components/FeaturedProducts'
import LatestProducts from '@/components/LatestProducts'

export default function Home(){
    return (
        <main className='w-full'>
        <HomeBanner />
        <FeaturedProducts />
        <LatestProducts />
        </main>
    )
}

