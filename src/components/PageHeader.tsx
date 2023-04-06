import React, { useContext } from 'react'
import ImageDisplay from './image-display'
import { ApplicationContext } from '@/context/ApplicationContext';
import { useRouter } from 'next/router';

function PageHeader() {

  const {
    updateData,
    state: { entreprise, menus },
  } = useContext(ApplicationContext);

  const router = useRouter();
  const pathname = router.pathname === '/' ? 'accueil-1' : router.pathname;
  console.log(router?.pathname);
  
  return (
    <>
    {
      menus ? (
      <section className='relative container'>
      
        <ImageDisplay 
          wrapperClasses='h-full absolute'
          image={menus
                .filter((menu: any) =>  menu.slug === pathname)
                .map((menu: any)=> menu.images[0].directus_files_id)[0]
              }
        />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam similique sapiente neque esse minus. 
        Vitae, dolorem sit, incidunt pariatur et assumenda quidem beatae ab voluptatem iusto fugiat, voluptatum rerum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam similique sapiente neque esse minus. 
        Vitae, dolorem sit, incidunt pariatur et assumenda quidem beatae ab voluptatem iusto fugiat, voluptatum rerum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam similique sapiente neque esse minus. 
        Vitae, dolorem sit, incidunt pariatur et assumenda quidem beatae ab voluptatem iusto fugiat, voluptatum rerum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magnam similique sapiente neque esse minus. 
        Vitae, dolorem sit, incidunt pariatur et assumenda quidem beatae ab voluptatem iusto fugiat, voluptatum rerum!x
      </section>
      ): null
    }
    </>
  )
}

export default PageHeader
