import Link from 'next/link'
import React from 'react'
import ImageDisplay from '../image-display'

function SpaceCard({data}: any) {
  return (
    <article className='relative h-96	mx-1 ms:px-0 md:flex-1 shadow-lg border-4 border-app-white rounded-lg h-40 overflow-hidden cursor-pointer'>
      {
         data.images && data.images.length ? (
          <ImageDisplay 
            image={data.images[0].directus_files_id} 
            wrapperClasses="rounded-lg overflow-hidden h-full" 
          />) : null
      }
      <div className="left-0 top-0 flex flex-col justify-end absolute py-4 px-6 bg-app-black/40 w-full h-full rounded-lg text-app-white">
        <h3 className='text-xl font-semibold'>{data.libelle}</h3>
        <div>
          <h4 className="font-extrabold text-3xl my-1">{data.prix[0].prix_id.valeur} &euro;</h4>
          <Link href="reservation" className='outline-yellow-button mt-3 block py-2'>
            Réserver maintenant
          </Link>
        </div>
      </div>
    </article>
  )
}

export default SpaceCard