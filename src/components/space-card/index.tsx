import Link from 'next/link'
import React from 'react'
import ImageDisplay from '../image-display'

function SpaceCard({data}: any) {
  return (
    <article className='relative h-96	flex-1 shadow-md border-4 border-app-white rounded-lg h-40 overflow-hidden cursor-pointer'>
      <ImageDisplay 
        image={data?.images[0].directus_files_id} 
        wrapperClasses="rounded-lg overflow-hidden h-full" 
      />
      <div className="left-0 top-0 flex flex-col justify-end absolute py-4 px-4 bg-black/40 w-full h-full rounded-lg text-app-white">
        <h3 className='text-xl'>{data.libelle}</h3>
        <Link href="reservation" className='outline-yellow-button mt-3'>
          Réserver maintenant
        </Link>
      </div>
    </article>
  )
}

export default SpaceCard