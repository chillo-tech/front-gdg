import React from 'react'

type Props = {
    details: string;
    espaces: string;
}

function Details({details, espaces}: Props) {
  return (
    <div>Details : {details} {espaces}</div>
  )
}

export default Details


export async function getServerSideProps(context: any) {
    const {params} = context;
    return {
      props: {
          ...params
      }, // will be passed to the page component as props
    };
  }