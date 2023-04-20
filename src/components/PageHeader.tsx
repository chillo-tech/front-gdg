import React, { useContext } from 'react'
import ImageDisplay from './image-display'
import { ApplicationContext } from '@/context/ApplicationContext';
import SearchBar from '@/containers/SearchBar';
import AppBreadcrumb from './AppBreadcrumb';
import classNames from 'classnames';
import { toTitle } from '@/utils';

function PageHeader({isAccueil = false, containerClasses = 'md:py-32 py-20'}: any) {

  const {state: { pageHeader,entreprise }} = useContext(ApplicationContext);
  return (
    <>
    {
      (pageHeader || entreprise) ? (
      <section className='relative pt-5 mb-2 w-full'>
        
        <ImageDisplay 
          wrapperClasses='w-full h-full absolute z-10 overflow-hidden'
          imageClasses='object-cover'
          image={pageHeader ? pageHeader.images[0].directus_files_id : entreprise.images[0].directus_files_id}
        />
        <div className={classNames(containerClasses, "container relative z-30 text-white flex flex-col justify-center items-center px-4 md:px-20 mt-20")}>
          <div className="w-full bg-[rgba(0,0,0,0.5)] px-4 md:px-10 py-2 md:py-10 rounded-2xl">
             {isAccueil ? (
                <> 
                 <h1 className='text-2xl md:text-4xl break-before-avoid text-center w-full text-white font-thin'>
                   <span className="block"> Bienvenue sur notre gite </span>
                   <span className="block">Heureux de vous compter parmis nous</span>
                 </h1>
                 <SearchBar />
                </>
             ): (
              <> 
              <h1 className='text-5xl break-before-avoid text-center w-full text-white font-thin'>
               {toTitle(pageHeader?.titre)}
              </h1>
              <AppBreadcrumb />
             </>
             )}
          </div>
        </div>
     </section>
      ): null
    }
    </>
  )
}

export default PageHeader
