import Rating from '@/components/Rating';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import { ApplicationContext } from '@/context/ApplicationContext'
import React, { useContext } from 'react'

function AvisUtilisateurs() {
  const {state: {entreprise}} = useContext(ApplicationContext);
  
  return (  
    <>
      {
        entreprise && entreprise.revue ?(
          <section className="bg-app-gray px-5">
            <section className="pt-20 pb-20">
            <h2 className="flex flex-col items-center justify-center md:mb-10">
              <span className='px-10 py-3 text-center font-extralight text-2xl md:text-4xl'>
                Ce que nos clients pensent de nous
              </span>
            </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {
                    entreprise.revue
                    //.sort((a: any, b:any) => a.moyenne > b.moyenne ? -1 : 1)
                    .slice(0, 4).map((avis: any, index: number) => (
                        <article
                            key={`adresse-${avis.item?.id}-${index}`}
                            className="bg-app-white flex flex-col mb-3 text-xl shadow-md justify-between rounded-xl p-5 border border-gray-200"
                        >
                          <RenderHtmlContent content={avis?.item?.commentaire} classes="text-lg"/>
                          <div className="flex flex-col mt-3">
                            <Rating rate={5} />
                            <div className='text-left font-extralight text-md'>
                              {avis?.item?.prenom}
                              <span className='uppercase ml-1'>{avis?.item?.nom}</span>
                            </div>
                          </div> 
                        </article>
                    ))
                }
              </div>
            </section>
          </section>
        ) : null
      }
    </>    
  )
}

export default AvisUtilisateurs