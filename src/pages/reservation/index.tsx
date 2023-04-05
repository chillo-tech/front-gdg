import React, { useState } from 'react';
import ReservationForm from '@/components/forms/CustomForm';
import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import {
  APP_NAME,
  GitePreview,
  HEADER_RESERVATION,
  PARTIAL_SPACES,
} from '@/utils';
import Head from 'next/head';
import GiteCard from '@/components/gite-card';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';

//Only for front-end developpement purpose
const dummyData: GitePreview[] = [
  {
    name: 'Nom du gite 1',
    address: 'Adresse du gite 1',
    pictureURL: '/assets/images/bg-header.png',
    pricePerNight: 55,
    rate: 3.5,
    shouldBePaidInAdvance: true,
    status: 'available',
  },
  {
    name: 'Nom du gite 2',
    address: 'Adresse du gite 2',
    pictureURL: '/assets/images/bg-header.png',
    pricePerNight: 55,
    rate: 3.5,
    shouldBePaidInAdvance: true,
    status: 'available',
  },
  {
    name: 'Nom du gite 3',
    address: 'Adresse du gite 3',
    pictureURL: '/assets/images/bg-header.png',
    pricePerNight: 45,
    rate: 5,
    shouldBePaidInAdvance: false,
    status: 'available',
  },
  {
    name: 'Nom du gite 4',
    address: 'Adresse du gite 4',
    pictureURL: '/assets/images/bg-header.png',
    pricePerNight: 75,
    rate: 1.5,
    shouldBePaidInAdvance: true,
    status: 'available',
  },
  {
    name: 'Nom du gite 5',
    address: 'Adresse du gite 5',
    pictureURL: '/assets/images/bg-header.png',
    pricePerNight: 80,
    rate: 2.5,
    shouldBePaidInAdvance: false,
    status: 'unavailable',
  },
];

function Reservation() {
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
        limit: 6,
      }),
  });

  return (
    <Layout
      headerTitle={HEADER_RESERVATION.title}
      headerChildren={<SubTitle subtitle={HEADER_RESERVATION} />}>
      <Head>
        <title> {APP_NAME} | Réservation</title>
      </Head>
      <div className="flex flex-col pt-10 md:pt-28 mb-8 md:mb-10 items-center font-thin text-center">
        <h1 className="w-full text-4xl">Votre sélection</h1>
      </div>
      <div className="flex flex-col gap-6 items-center w-11/12 md:w-10/12 mx-auto pb-8">
        {spaces
          ?.filter((item: any) => item.prix.length)
          .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
          .map((gite: any, index: number) => {
            return (
              <GiteCard
                address={gite?.address}
                notReserved={false}
                name={gite?.libelle}
                pictureURL={gite?.images[0]?.directus_files_id}
                pricePerNight={gite?.prix[0]?.prix_id?.valeur}
                rate={gite?.rate}
                shouldBePaidInAdvance={gite?.shouldBePaidInAdvance}
                status={gite?.status}
                key={`gite-${index}`}
              />
            );
          })}
        <div className="w-full text-center py-10 h-full flex justify-center items-center">
          <span className="text-app-small-black flex justify-between items-center gap-10 text-lg">
            Total :{' '}
            <strong className="inline-block text-3xl font-extrabold text-app-black">
              {spaces.reduce((sum: number, gite: any) => {
                console.log(gite?.prix[0]?.prix_id?.valeur);
                let value: number = +gite?.prix[0]?.prix_id?.valeur;
                if (!value) return sum;
                return sum + value;
              }, 0)}{' '}
              &euro;
            </strong>
          </span>
        </div>
      </div>
      <div className="flex w-full h-full pb-8 md:pb-32">
        <ReservationForm
          title="Confirmer votre reservation"
          messageTitle="Description"
          action={(data: any) => console.log(data)}
        />
      </div>
    </Layout>
  );
}

export default Reservation;
