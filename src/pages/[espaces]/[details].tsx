import Debug from '@/components/Debug';
import Metadata from '@/components/Metadata';
import ImageDisplay from '@/components/image-display';
import Layout from '@/containers/Layout';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { MENUFULL } from '@/utils';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useQuery } from 'react-query';

type Props = {
  details: string;
  espaces: string;
};

function Details() {
  const context = useContext(ApplicationContext);
  const { updateData } = context;
  const router = useRouter();
  const { asPath } = router;
  const [data, setData] = useState<any>();
  useQuery<any>({
    queryKey: ['espaces', asPath],
    queryFn: () =>
      fetchData({
        path: `espace/${asPath.substring(asPath.lastIndexOf('-') + 1)}`,
        fields: `*,${MENUFULL}`,
      }),
    onSuccess: (data) => {
      setData(data.data.data);
      updateData({pageHeader: {images: data.data.data.images, titre:  data.data.data.libelle}})
    },
  });

  return (
    <>
      <Metadata entry={data?.metadonnees[0]} />
      <Layout>
        <section className="container">
          <div className="flex flex-col items-center justify-start gap-8 w-full h-screen py-8 bg-app-light-yellow text-app-black">
            <div className="flex w-11/12 md:w-3/4 justify-end gap-5">
              <button>
                <BsArrowLeftShort
                  className={`w-7 h-7 rounded-full text-app-yellow hover:text-white hover:bg-app-yellow border-2 border-app-yellow`}
                />
              </button>
              <button>
                <BsArrowRightShort
                  className={`w-7 h-7 rounded-full bg-app-yellow text-white border-2 border-app-yellow`}
                />
              </button>
            </div>
            <div className="container h-80">
              <ImageDisplay
                image={data?.images[3].directus_files_id}
                imageClasses="object-contain"
                wrapperClasses="w-full h-full relative border-4 border-white rounded-lg"
              />
            </div>
            <div className="w-full text-center">
              <span className="text-md text-app-brown opacity-50">{data?.address}</span>
              <div className="flex justify-center my-2 mx-4 gap-4 items-center">
                <span className="h-[2px] w-20 md:w-40 bg-app-yellow rounded block"></span>
                <h3 className="font-bold text-3xl">${data?.pricePerNight} /nuit</h3>
                <span className="h-[2px] w-20 md:w-40 bg-app-yellow rounded block"></span>
              </div>
              <span className="text-md text-app-black opacity-50">Nombre de chambre: 03</span>
            </div>
          </div>
          <div className="flex flex-col pt-14 mb-12 items-center font-thin text-center">
            <h2 className="w-full text-4xl">Description</h2>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Details;

export async function getServerSideProps(context: any) {
  const { params } = context;
  return {
    props: {
      ...params,
    }, // will be passed to the page component as props
  };
}
