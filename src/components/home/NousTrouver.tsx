import { ApplicationContext } from '@/context/ApplicationContext'
import React, { useContext } from 'react'
import Carte from "@/components/Carte";
import { BsFillRecordFill } from 'react-icons/bs';
import RenderHtmlContent from '../RenderHtmlContent';

function NousTrouver() {
  const {state: {entreprise}} = useContext(ApplicationContext);
  return (
    <>
    {(entreprise?.adresse)? (
      <section className="bg-white overflow-hidden md:py-20 relative">
          <div className="container">
              <div className="flex items-stretch grid gap-2 lg:grid-cols-2 relative">
              <div className="p-8 z-1 hidden lg:block bg-white rounded-3xl shadow-lg shadow-indigo" style={{zIndex: 1}}>
                      <RenderHtmlContent content={entreprise.abstrait}/>
                      <p className='mt-2'>Retrouvez nous au </p>
                          {
                              entreprise?.adresse.map((adresse: any, index: number) => (
                                  <p
                                      key={`adresse-${adresse.item.id}-${index}`}
                                      className="flex items-center font-extrabold text-xl"
                                  >
                                      {`${adresse.item.rue}, ${adresse.item.code_postal} ${adresse.item.ville}`}
                                  </p>
                              ))
                          }
                    </div>
                  <Carte adresses={entreprise?.adresse}/>
              
              </div>
              <span className="z-0 hidden lg:block absolute h-96 w-96 top-3/4 left-3/4 bg-app-blue rounded-full"/>
          </div>
      </section>)
      : null
    }
    </>
  )
}

export default NousTrouver
