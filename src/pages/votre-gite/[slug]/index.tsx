import Button from '@/components/buttons/Button';
import AvisUtilisateurs from '@/components/home/AvisUtilisateurs';
import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import SearchBar from '@/containers/SearchBar';
import { APP_NAME, HEADER_VOTRE_GITE_DETAILS, toTitle } from '@/utils';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort, BsCheck } from 'react-icons/bs';

function DetailsGite({ slug }: { slug: string }) {
  // Fetch the details from the server
  const [gite, setgite]: any = useState(undefined);

  const [HEADER_DETAILS, setHEADER_DETAILS]: any = useState(undefined);

  // TODO: remove and fetch data from the server
  useEffect(() => {
    setgite({
      name: `${toTitle(slug)}`,
      address: 'http://localhost',
      pictureURL: '/assets/images/bg-header.png',
      pricePerNight: 90,
      rate: 4,
      shouldBePaidInAdvance: true,
      status: 'available',
      titresDeValeur: [
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
        'Titre de la valeur',
      ],
    });

    setHEADER_DETAILS({
      ...HEADER_VOTRE_GITE_DETAILS,
      title: toTitle(slug.replaceAll('-', ' ')),
    });
  }, []);

  if (!HEADER_DETAILS?.title || !gite) return null; // TODO: Loader

  return (
    <Layout
      headerTitle={HEADER_DETAILS.title}
      headerChildren={
        <>
          <SubTitle subtitle={HEADER_DETAILS} />
          <SearchBar />
        </>
      }>
      <Head>
        <title>
          {APP_NAME} | {HEADER_DETAILS.title}
        </title>
      </Head>
      <div className="flex flex-col items-center justify-start gap-8 w-full h-screen py-8 bg-app-light-yellow text-app-black">
        <div className="flex w-3/4 justify-end gap-5">
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
        <div
          className={`flex-1 w-3/4 border-4 border-white overflow-hidden rounded-mdbg-center bg-cover bg-no-repeat`}
          style={{ backgroundImage: `url(${gite.pictureURL})` }}></div>
        <div className="w-full text-center">
          <span className="text-md text-app-brown opacity-50">
            {gite.address}
          </span>
          <div className="flex justify-center my-2 gap-4 items-center">
            <span className="h-[2px] w-40 bg-app-yellow rounded block"></span>
            <h3 className="font-bold text-3xl">${gite.pricePerNight} /nuit</h3>
            <span className="h-[2px] w-40 bg-app-yellow rounded block"></span>
          </div>
          <span className="text-md text-app-black opacity-50">
            Nombre de chambre: 03
          </span>
        </div>
      </div>
      <div className="flex flex-col pt-14 mb-12 items-center font-thin text-center">
        <h2 className="w-full text-4xl">Description</h2>
      </div>
      <div className="flex flex-col gap-6 mb-16 justify-center items-center text-center font-thin w-10/12 mx-auto">
        <p className="w-full">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="flex flex-col py-14 items-center font-thin text-center">
        <h2 className="w-full text-4xl">Constitution du gite</h2>
      </div>
      <div className="w-3/4 grid gap-4 pb-20 grid-cols-6 md:grid-cols-12 mx-auto">
        {gite?.titresDeValeur.map((titreDeValeur: string) => {
          return (
            <div className="col-span-3 text-center">
              <BsCheck
                className={`w-4 h-4 mb-1 inline-block mr-2 rounded-full text-white bg-app-green`}
              />
              {titreDeValeur}
            </div>
          );
        })}
      </div>
      <div className="mb-20 w-full flex justify-center items-center">
        <Button
          title="Réserver"
          className="w-60 rounded-md bg-app-yellow text-white"
          onClick={() => {}}
        />
      </div>
      <AvisUtilisateurs />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  return {
    props: {
      ...params,
    },
  };
}

export default DetailsGite;
