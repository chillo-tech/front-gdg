import React, { useContext } from 'react'
import ImageDisplay from './image-display'
import { ApplicationContext } from '@/context/ApplicationContext';
import SearchBar from '@/containers/SearchBar';
import AppBreadcrumb from './AppBreadcrumb';

function PageHeader({isAccueil = false}: any) {

  const {state: { pageHeader }} = useContext(ApplicationContext);
  
  return (
    <>
    {
      pageHeader ? (
      <section className='relative mb-2 w-full'>
        
        <ImageDisplay 
          wrapperClasses='w-full h-full absolute z-10 overflow-hidden'
          imageClasses='object-cover'
          image={pageHeader.images[0].directus_files_id}
        />
        <div className="container relative z-30 py-44 text-white flex flex-col justify-center items-center px-20 mt-20">
          <div className="w-full bg-[rgba(0,0,0,0.5)] px-10 py-10 rounded-2xl">
             {isAccueil ? (
                <> 
                 <h1 className='text-4xl break-before-avoid text-center w-full text-white font-thin'>
                   <span className="block"> Bienvenue sur notre gite </span>
                   <span className="block">Heureux de vous compter parmis nous</span>
                 </h1>
                 <SearchBar />
                </>
             ): (
              <> 
              <h1 className='text-5xl break-before-avoid text-center w-full text-white font-thin'>
               {pageHeader?.titre}
              </h1>
              <AppBreadcrumb />
             </>
             )}
              <div>
                
              </div>
          </div>
        </div>
     </section>
      ): null
    }
    </>
  )
}

export default PageHeader
