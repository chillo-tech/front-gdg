import Link from 'next/link'
import React from 'react'
import ImageDisplay from '../image-display';

function SpaceCard({data}: any) {
  return (
    <Link href={`/nos-chambres/${data?.slug}`} className='relative h-96	mx-1 ms:px-0 md:flex-1 shadow-lg border-4 border-app-white rounded-lg overflow-hidden'>
      {
         data?.images?.length ? (
          <ImageDisplay 
            image={data.images[0].directus_files_id} 
            wrapperClasses="rounded-lg overflow-hidden h-full relative" 
          />) : null
      }
      <div className="left-0 top-0 flex flex-col justify-end absolute py-4 px-6 bg-app-black/40 w-full h-full rounded-lg text-app-white">
        <h3 className='text-xl font-semibold'>{data?.libelle}</h3>
        <div>
          <h4 className="font-extrabold text-3xl my-1">{data?.types[0].type_id?.prix[0]?.item?.valeur} &euro;</h4>
          <Link href="/reservation" className='outline-yellow-button mt-3 block py-2'>
            Réserver maintenant
          </Link>
        </div>
      </div>
    </Link>
  )
}

export default SpaceCard