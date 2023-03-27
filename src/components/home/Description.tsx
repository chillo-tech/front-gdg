import { ApplicationContext } from '@/context/ApplicationContext';
import React, { useContext } from 'react'
import ImageDisplay from '../image-display';
import RenderHtmlContent from '../RenderHtmlContent';

function Description() {

  const context = useContext(ApplicationContext);
  const {state: {entreprise}} = context;

  return (
    <>
    {
      entreprise ? (
        <section>
          <div className="container px-2 py-10 flex flex-col md:flex-row gap-8 items-stretch">
            <RenderHtmlContent content={entreprise.description} classes="flex-1 shadow p-4 md:p-6 text-lg rounded-lg"/>
            <ImageDisplay image={entreprise.images[0].directus_files_id} wrapperClasses="shadow-lg w-full flex-1 rounded-lg overflow-hidden" classes="rounded-lg"/>
          </div>
        </section>

      ): null
    }
    </>
  )
}

export default Description
