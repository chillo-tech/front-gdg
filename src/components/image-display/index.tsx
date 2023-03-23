import classNames from 'classnames'
import Image from 'next/image';
import React, {useState} from 'react'

function ImageDisplay({
  image,
  wrapperClasses = 'h-full',
  imageClasses
}: any) {
  const [isImageLoading, setLoading] = useState(true);

  const loaderProp =({ src }: {src: string}) => {
    return src;
  }
  return (
    <div className={classNames('relative', wrapperClasses)}>
      <Image 
        loader={loaderProp}
        src={`${process.env.API_URL}/assets/${image.id}`} 
        alt={image.title} 
        fill={true}
        className={
          classNames(
            imageClasses,
            isImageLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'

          )
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}

export default ImageDisplay;
