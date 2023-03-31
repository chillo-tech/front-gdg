import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { GitePreview, ROUTE_VOTRE_GITE, slugify } from '@/utils';
import classNames from 'classnames';
import Image from 'next/image';
import Button from '../buttons/Button';
import RatingStar from '../RatingStar';
import Link from 'next/link';

function GiteCard({
  className,
  notReserved = true,
  pictureURL,
  address,
  name,
  pricePerNight,
  rate,
  shouldBePaidInAdvance,
  status,
}: GitePreview) {
  return (
    <div
      className={classNames(
        `rounded-lg overflow-hidden flex items-stretch border border-app-gray shadow-lg justify-between ${
          !notReserved ? 'h-64 md:h-48' : 'h-48'
        } w-full ${className}`
      )}>
      <div className={classNames('w-1/3 h-full')}>
        <Image
          width={400}
          height={400}
          src={pictureURL}
          className="w-full h-full"
          alt={`Photo : ${name}`}
        />
      </div>
      <div
        className={classNames(
          'w-2/3 h-full flex flex-col justify-between gap-4 bg-white p-2 md:p-4 md:pl-12'
        )}>
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div>
            <Link
              className="text-app-black font-semibold text-xl"
              href={`${ROUTE_VOTRE_GITE}/${slugify(name)}`}>
              {name}
            </Link>
            <RatingStar classNames={notReserved ? 'my-2' : ''} rate={rate} />
            <span className="text-app-small-black">{address}</span>
          </div>
          <div>
            <h3
              className={` ${
                notReserved
                  ? 'text-app-brown text-3xl'
                  : 'text-app-black text-xl'
              }  font-bold`}>
              ${pricePerNight} /nuit
            </h3>
          </div>
        </div>
        <div className="w-full flex flex-col md:items-center gap-4 md:flex-row md:gap-0 md:justify-between">
          {!notReserved && (
            <div className="flex md:flex-col justify-between md:justify-start text-xs md:text-base">
              <span className="text-app-small-black">
                Statut :{' '}
                <strong
                  className={`${
                    status === 'available' ? 'text-app-green' : 'text-app-brown'
                  } opacity-100`}>
                  {status === 'available' ? 'Disponible' : 'Indisponible'}
                </strong>
              </span>
              <span className="text-app-small-black">
                Avance : {shouldBePaidInAdvance ? 'Exiger' : 'Non exiger'}
              </span>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-2">
            {!notReserved ? (
              <>
                <Button
                  title="Annuler"
                  className="bg-app-xs-black text-app-black"
                  onClick={() => {}}
                />
                <Button
                  icon={<BsCheck className="inline-block mr-2 h-5 w-5" />}
                  title="Valider"
                  className="bg-app-yellow text-app-black hover:text-white"
                  onClick={() => {}}
                />
              </>
            ) : (
              <Button
                title="Réserver maintenant"
                className="bg-app-yellow rounded-md hover:bg-opacity-80 text-white"
                onClick={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiteCard;
