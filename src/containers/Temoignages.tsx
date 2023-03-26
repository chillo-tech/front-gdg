import React from 'react';
import { AiTwotoneCiCircle } from 'react-icons/ai'

function Temoignages() {
  return (
    <div className="h-[34rem] relative w-full bg-app-gray text-center font-thin px-4 pt-14 z-20 overflow-y-hidden">
      <AiTwotoneCiCircle className='absolute -top-28 -left-10 text-app-black opacity-5 w-[100%] h-96 z-10' />
      <h3 className='uppercase text-xl text-app-brown'>Témoignages</h3>
      <h2 className='text-3xl mt-4'>Ce que nos clients pensent de nous.</h2>
    </div>
  );
}

export default Temoignages;
