import ImageSlider from '@/components/ImageSlider';
import Metadata from '@/components/Metadata';
import RenderHtmlContent from '@/components/RenderHtmlContent';
import Loisirs from '@/components/home/Loisirs';
import Services from '@/components/home/Services';
import ImageDisplay from '@/components/image-display';
import Layout from '@/containers/Layout';
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { MENUFULL } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useQuery } from 'react-query';

type Props = {
  details: string;
  espaces: string;
};

function Details({id}:{id: number}) {
  const context = useContext(ApplicationContext);
  const { updateData } = context;
  const router = useRouter();
  const { asPath } = router;
  const [data, setData] = useState<any>();

  useQuery<any>({
    queryKey: ['espaces', asPath],
    enabled: asPath !== '[details]',
    queryFn: () =>
      fetchData({
        path: `espace/${id}`,
        fields: `
        types.type_id.id,
        types.type_id.libelle,
        types.type_id.description,
        types.type_id.prix.item.valeur,
        types.type_id.prix.item.date,
        abstrait,
        description,
        ${MENUFULL}`,
      }),
    onSuccess: (data) => {
      setData(data.data.data);
      updateData({ pageHeader: { images: data.data.data.images, titre: data.data.data.libelle } })
    },
  });

  return (
    <>
      <Metadata entry={data?.metadonnees[0]} />
      <Layout>
        <section className="bg-app-light-yellow text-app-black">
          <div className="flex flex-col items-center justify-start gap-8 w-full py-8">
            <ImageSlider images={data?.images}/>
            <div className="container flex items-center justify-end gap-4">
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
            
            <div className="w-full text-center">
              <div className="flex justify-center my-2 mx-4 gap-4 items-center">
                <span className="h-[2px] w-20 md:w-40 bg-app-yellow rounded block"></span>
                <h3 className="font-bold text-3xl">{data?.types[0].type_id?.prix[0]?.item?.valeur} euros / nuit</h3>
                <span className="h-[2px] w-20 md:w-40 bg-app-yellow rounded block"></span>
              </div>
              <h1 className="text-md text-app-black mb-6 text-3xl">{data?.libelle}</h1>
              <div className="text-md text-app-black opacity-50 mb-10">
                <RenderHtmlContent classes="container text-lg" content={data?.abstrait} />
              </div>
              <Link
                className={classNames('bg-app-yellow text-white px-10 py-3 text-xl shadow-lg font-thin')}
                href='/reservation'>
                Réserver
              </Link>
            </div>
          </div>
        </section>
        <section className='bg-white'>
          <div className="flex flex-col items-center font-thin text-center pt-10 pb-0">
            <RenderHtmlContent classes="container text-lg text-app-black opacity-50" content={data?.description} />
          </div>
        </section>
        <Services classes='bg-white'/>
        <Loisirs classes='bg-white' />
        <section className='flex justify-center items-center pb-10'>
          <Link
            className={classNames('bg-app-yellow text-white px-10 py-3 text-xl shadow-lg font-thin')}
            href='/reservation'>
            Réserver
          </Link>
        </section>
      </Layout>
    </>
  );
}

export default Details;
export async function getServerSideProps(context: any) {
  const { params } = context;
  const id = params['details'].substring(
    params['details'].lastIndexOf('-') + 1
  );
  return { props: { ...params, id, slug: params['details'] } };
}
