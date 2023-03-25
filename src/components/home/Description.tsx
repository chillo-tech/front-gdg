import { ApplicationContext } from '@/context/ApplicationContext';
import React, { useContext } from 'react'

function Description() {

  const context = useContext(ApplicationContext);
  const {state} = context;

  return (
    <section>
      <div className="container py-10">
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </section>
  )
}

export default Description
