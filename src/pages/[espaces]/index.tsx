import React from 'react';
import { json } from 'stream/consumers';

function Espaces({espaces}: {espaces: string}) {
  return <div>{espaces} Training</div>;
}

export async function getServerSideProps(context: any) {
  const {params} = context;
  return {
    props: {
        ...params
    }, // will be passed to the page component as props
  };
}

export default Espaces;
