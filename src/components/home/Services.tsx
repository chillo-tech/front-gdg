import { ApplicationContext } from '@/context/ApplicationContext';
import React, { useContext } from 'react'
import ImageDisplay from '../image-display';
import classNames from 'classnames';

function Services({classes='bg-app-light-yellow', displayTitle = true}: any) {
  const context = useContext(ApplicationContext);
  const {state: {entreprise}} = context;

  return (
    <>
      {
        (entreprise && entreprise.services) ? (
          <section className={classNames('py-5', classes)}>
            {
              displayTitle ? (
                <div className="container">
                  <h2 className='text-app-black text-4xl font-bold text-center md:text-left py-4'>
                    Nos services
                  </h2>
                </div>
              ) : null
            }
            <div className="container items-center grid md:grid-cols-6 justify-center gap-6">
              {entreprise.services.slice(0, 6).map((service: any) => (
                <article key={`gdg-service-${service.id}`} className='flex flex-col border border-app-yellow rounded-full w-40 h-40 items-center justify-center'>
                  <ImageDisplay image={service.image_service} wrapperClasses="h-64 md:h-10 w-10 rounded-lg overflow-hidden relative"/>
                   <h3 className='text-md !font-thin pt-2 text-center'>{service.nom_service}</h3>
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

export default Services
