import React from 'react'
import HomeBanner from '@/components/HomeBanner'
import FeaturedProducts from '@/components/FeaturedProducts'

export default function Home(){
    return (
        <main className='w-full'>
        <HomeBanner />
        <FeaturedProducts />
        </main>
    )
}

