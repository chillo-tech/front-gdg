import { ApplicationContext } from '@/context/ApplicationContext';
import React, { useContext } from 'react'
import ImageDisplay from '../image-display';

function Loisirs() {
  const context = useContext(ApplicationContext);
  const {state: {entreprise}} = context;

  return (
    <>
      {
        (entreprise && entreprise.loisirs) ? (
          <section className='bg-app-light-yellow pt-10 pb-16'>
            <div className="container">
              <h2 className='text-app-black text-4xl font-bold text-center md:text-left py-4'>
                Loisirs et commodités
              </h2>
            </div>
            <div className="container gap-6 grid px-2 md:grid-cols-4 justify-between">
            
              {entreprise.loisirs.map((loisir: any) => (
                <article key={`gdg-loisir-${loisir.id}`}>
                   <ImageDisplay image={loisir.images} wrapperClasses="h-48 rounded-lg overflow-hidden"/>

                  <div className="flex justify-between items-center h-12 text-xl">
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
