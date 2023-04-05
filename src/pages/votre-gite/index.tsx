import React, { useState } from 'react';
import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import SearchBar from '@/containers/SearchBar';
import { APP_NAME, HEADER_VOTRE_GITE, PARTIAL_SPACES } from '@/utils';
import Head from 'next/head';
import Card from '@/components/gite-card/Card';
import AvisUtilisateurs from '@/components/home/AvisUtilisateurs';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import GiteCard from '@/components/gite-card';

function VotreGite() {
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
          {spaces
            ?.filter((item: any) => item.prix.length)
            .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
            .map((gite: any, index: number) => {
              return (
                <Card
                  address={gite?.address}
                  name={gite?.libelle}
                  pictureURL={`/assets/${gite?.images[0]?.directus_files_id?.id}`}
                  pricePerNight={gite?.prix[0]?.prix_id?.valeur}
                  rate={gite?.rate}
                  shouldBePaidInAdvance={gite?.shouldBePaidInAdvance}
                  status={gite?.status}
                  key={`gite-${index}`}
                />
              );
            })}
          {/* Version Mobile */}
          {spaces
            ?.filter((item: any) => item.prix.length)
            .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
            .map((gite: any, index: number) => {
              return (
                <div
                  key={`gite-${index}`}
                  className="md:hidden col-span-12 w-full px-3">
                  <GiteCard
                    address={gite?.address}
                    name={gite?.libelle}
                    pictureURL={gite?.images[0]?.directus_files_id}
                    pricePerNight={gite?.prix[0]?.prix_id?.valeur}
                    rate={gite?.rate}
                    shouldBePaidInAdvance={gite?.shouldBePaidInAdvance}
                    status={gite?.status}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <AvisUtilisateurs />
    </Layout>
  );
}

export default VotreGite;
