import React, { useState } from 'react'
import Debug from './Debug'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ImageDisplay from './image-display';
import Image from 'next/image';
import classNames from 'classnames';

function ImageSlider({images}: any) {
  const [currentImage, setCurrentImage] = useState(0);
  const goToPrevious = () => {
    setCurrentImage((prev: number) => {      
      return currentImage ===  0 ? 9 : prev - 1;
    })
      
  }
  const goToNext = () => {
    setCurrentImage((prev: number) => {
      return currentImage ===  images.length -1 ? 0 :prev + 1;
    })
  }
  return (
    <>
     { images ? (
        <article className='container rounded-lg border-8 border-white h-128 relative w-full'>
        <button type='button' onClick={goToPrevious}>
          <BsArrowLeftShort
            className={`absolute z-10 top-1/2 left-4 w-10 h-10 rounded-full text-app-yellow hover:text-white hover:bg-app-yellow border-2 border-app-yellow`}
          />
        </button>
        <button type='button' onClick={goToNext}>
          <BsArrowRightShort
            className={`absolute z-10 top-1/2 right-4 w-10 h-10 rounded-full text-app-yellow hover:text-white hover:bg-app-yellow border-2 border-app-yellow`}
          />
        </button>
            <Image 
              key={images[currentImage].directus_files_id.id}
              src={`${process.env.API_URL}/assets/${images[currentImage].directus_files_id.id}`} 
              alt={images[currentImage].directus_files_id.title} 
              unoptimized
              fill={true}
              className={
                classNames(
                    'object-contain'
                )
              }
            />
        </article>
     ): null}
    </>
  )
}

export default ImageSlider
