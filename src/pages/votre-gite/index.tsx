import React from 'react';
import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import SearchBar from '@/containers/SearchBar';
import Temoignages from '@/containers/Temoignages';
import { APP_NAME, GitePreview, HEADER_VOTRE_GITE } from '@/utils';
import Head from 'next/head';
import Card from '@/components/gite-card/Card';
import AvisUtilisateurs from '@/components/home/AvisUtilisateurs';

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

function VotreGite() {
  return (
    <Layout
      headerTitle={HEADER_VOTRE_GITE.title}
      headerChildren={
        <>
          <SubTitle subtitle={HEADER_VOTRE_GITE} />
          <SearchBar />
        </>
      }>
      <Head>
        <title> {APP_NAME} | Votre gite</title>
      </Head>
      <div className="flex w-full h-full py-8 md:py-32">
        <div className="container grid grid-cols-12 gap-6">
          {dummyData.map((gite, index) => {
            return (
              <Card
                address={gite.address}
                name={gite.name}
                pictureURL={gite.pictureURL}
                pricePerNight={gite.pricePerNight}
                rate={gite.rate}
                shouldBePaidInAdvance={gite.shouldBePaidInAdvance}
                status={gite.status}
                key={`gite-${index}`}
              />
            );
          })}
        </div>
      </div>
      <AvisUtilisateurs />
    </Layout>
  );
}

export default VotreGite;
