import React, { useEffect, useState, useCallback } from 'react'

import image1 from '../assest/banner/img3.jpg'
import image2 from '../assest/banner/img5.webp'
import image3 from '../assest/banner/image6.png'
import image4 from '../assest/banner/image7.jpg'
import image5 from '../assest/banner/shyambabaimage.jpeg'

import image1Mobile from '../assest/banner/img3_mobile.jpg'
import image2Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image5,
        image1,
        image2,
        image3,
        image4
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile
    ]

    const nextImage = useCallback(() => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        } else {
            setCurrentImage(0)
        }
    }, [currentImage, desktopImages.length])

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage()
        }, 10000)

        return () => clearInterval(interval)
    }, [currentImage, nextImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='h-full md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                {/* Desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageUrl, index) => (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageUrl} className='w-full h-full' alt={`Banner ${index + 1}`} />
                            </div>
                        ))
                    }
                </div>

                {/* Mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageUrl, index) => (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageUrl} className='w-full h-full object-cover' alt={`Mobile Banner ${index + 1}`} />
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
