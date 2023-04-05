import { GitePreview, ROUTE_VOTRE_GITE, slugify } from '@/utils';
import Link from 'next/link';
import React from 'react';
import GiteCard from '.';
import Button from '../buttons/Button';
import RatingStar from '../RatingStar';

function Card({
  pictureURL,
  address,
  name,
  pricePerNight,
  rate,
  shouldBePaidInAdvance,
  status,
}: GitePreview) {

  return (
    <>
      <div
        className={`hidden md:flex md:flex-col relative bg-blend-multiply col-span-4 h-96 rounded-lg text-white overflow-hidden bg-center bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${process.env.API_URL}${pictureURL})` }}>
        <div
          className="z-50 w-full h-full flex flex-col justify-end items-center pb-6"
          style={{
            background: `transparent linear-gradient(180deg, #29292900 0%, #292929 100%) 0% 0% no-repeat padding-box`,
          }}>
          <Link href={`${ROUTE_VOTRE_GITE}/${slugify(name)}`}>{name}</Link>
          <RatingStar rate={rate} />
          <span className="text-app-sm-white text-sm opacity-60">
            {address}
          </span>
          <h3 className="font-bold mt-2 text-3xl">{pricePerNight} &euro; /nuit</h3>
          <Button
            title="Réserver maintenant"
            className="mt-4 border-2 border-app-yellow rounded-md text-app-yellow hover:bg-app-yellow hover:text-white"
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="md:hidden col-span-12 w-full px-3">
        <GiteCard
          address={address}
          name={name}
          pictureURL={pictureURL}
          pricePerNight={pricePerNight}
          rate={rate}
          shouldBePaidInAdvance={shouldBePaidInAdvance}
          status={status}
        />
      </div>
    </>
  );
}

export default Card;
