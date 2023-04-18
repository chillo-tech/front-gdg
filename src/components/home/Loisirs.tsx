import { ApplicationContext } from '@/context/ApplicationContext';
import React, { useContext } from 'react'
import ImageDisplay from '../image-display';
import classNames from 'classnames';
import Debug from '../Debug';
import { slugify } from '@/utils';

function Loisirs({classes='bg-app-light-yellow', displayTitle = true}: any) {
  const context = useContext(ApplicationContext);
  const {state: {entreprise}} = context;

  return (
    <>
      {
        (entreprise && entreprise.loisirs) ? (
          <section className={classNames('pt-10 pb-16', classes)}>
            {
              displayTitle ? (
                <div className="container">
                  <h2 className='text-app-black text-4xl font-bold text-center md:text-left py-4'>
                    Loisirs et commodités
                  </h2>
                </div>
              ) : null
            }
            <div className="container items-center grid md:grid-cols-4 justify-center gap-6">
              {entreprise.loisirs.map((loisir: any) => (
                <article key={`gdg-loisir-${slugify(loisir.libelle)}`}>
                  <ImageDisplay image={loisir.images} wrapperClasses="h-64 md:h-48 rounded-lg overflow-hidden relative"/>
                  <div className="flex justify-between items-center md:h-12 h-20 text-xl">
                   <h3 className='text-xl !font-thin pt-2'>{loisir.libelle}</h3>
                   <p className='font-black text-right w-24'>{loisir.distance} km</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
      )
      : null 
      }
    </>
  )
}

export default Loisirs
