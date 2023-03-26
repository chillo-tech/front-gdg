import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { GitePreview } from '@/utils';
import classNames from 'classnames';
import Image from 'next/image';
import Button from '../buttons/Button';

function GiteCard({
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
        'rounded-lg overflow-hidden flex items-stretch border border-app-gray shadow-lg justify-between h-64 md:h-48 w-full'
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
            <h3 className="text-app-black font-semibold text-xl">{name}</h3>
            <div className="flex gap-2 md:my-2">
              {[1, 2, 3, 4, 5].map((note) => {
                if (note < rate)
                  return <AiFillStar className="text-app-yellow" />;
                else return <AiOutlineStar />;
              })}
            </div>
            <span className="text-app-small-black">{address}</span>
          </div>
          <div>
            <h3 className="text-app-black font-bold text-xl">
              ${pricePerNight} /nuit
            </h3>
          </div>
        </div>
        <div className="w-full flex flex-col md:items-center gap-4 md:flex-row md:gap-0 md:justify-between">
          <div className="flex md:flex-col justify-between md:justify-start text-xs md:text-base">
            <span className="text-app-small-black">
              Statut :{' '}
              <strong className="text-app-green opacity-100">
                {status === 'available' ? 'Disponible' : 'Indisponible'}
              </strong>
            </span>
            <span className="text-app-small-black">
              Avance : {shouldBePaidInAdvance ? 'Exiger' : 'Non exiger'}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button title='Annuler' className='bg-app-xs-black text-app-black' onClick={() => {}} />
            <Button icon={<BsCheck className='inline-block mr-2 h-5 w-5' />} title='Valider' className='bg-app-yellow text-app-black hover:text-white' onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiteCard;
