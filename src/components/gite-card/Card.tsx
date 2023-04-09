import { GitePreview, ROUTE_VOTRE_GITE, slugify } from '@/utils';
import Link from 'next/link';
import React from 'react';
import ImageDisplay from '../image-display';

function Card({
  data,
  router,
  basePath}: GitePreview) {

  return (
    <>
      <Link href={`${basePath}/${data.slug}`}
        className={`relative overflow-hidden block h-96 rounded-lg text-white overflow-hidden flex-col mb-4 relative`}>
        <ImageDisplay image={data.images[0].directus_files_id}/>
        <div
          className="absolute inset-0 z-10 w-full h-full flex flex-col justify-end items-center pb-6"
          style={{
            background: `transparent linear-gradient(180deg, #29292900 0%, #292929 100%) 0% 0% no-repeat padding-box`,
          }}>
          <h2 className="font-light mt-2 text-xl">{data.libelle}</h2>
          {/*<RatingStar rate={rate} />*/}
         
          <h3 className="font-bold mt-2 text-3xl">{data.prix[0]} &euro; /nuit</h3>
          <button
            type='button'
            className="outline-yellow-button relative z-40 py-3 px-20 mt-2"
            onClick={(e) => {e.preventDefault();router.push(`${basePath}/${data.slug}`)}}
          >Réserver maintenant</button>
        </div>
      </Link>
    </>
  );
}

export default Card;
