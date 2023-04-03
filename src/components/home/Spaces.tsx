import { fetchData } from '@/services';
import { PARTIAL_SPACES } from '@/utils';
import Link from 'next/link';
import React, {useState} from 'react'
import { useQuery } from 'react-query';
import SpaceCard from '../space-card';

function Spaces() {
  const [spaces, setSpaces] = useState([]);
  useQuery<any>({
    queryKey: ['nos_espaces'],
    onSuccess: (data) => {
      setSpaces(data.data.data);
    },
    queryFn: () =>
      fetchData({
        path: 'espace',
        fields: PARTIAL_SPACES,
        limit: 6
      }),
  });
  return (
    <section className='bg-app-light-yellow pt-10 md:pt-24 pb-10'>
      <div className="container">
        <h1 className='text-app-black text-4xl font-bold text-center md:text-left'>Nos espaces</h1>
        {spaces && spaces.length ? (
                  <section className='flex flex-col md:flex-row shrink gap-5 justify-between py-9'>
                    {spaces
                      .filter((item: any) => item.prix.length)
                      .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
                      .slice(0,4)
                      .map((item: any, index: any) => <SpaceCard data={item} key={`space-${index}`}/>)}
                  </section>
                )
        : null 
        }
        <Link href="/espaces" className='yellow-button mt-3 mx-auto block w-52 uppercase font-bold'>
          Tout voir
        </Link>
      </div>
    </section>
  )
}

export default Spaces;