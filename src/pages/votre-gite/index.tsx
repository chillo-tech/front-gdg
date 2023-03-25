import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import SearchBar from '@/containers/SearchBar';
import Temoignages from '@/containers/Temoignages';
import { APP_NAME, HEADER_VOTRE_GITE } from '@/utils';
import Head from 'next/head';
import React from 'react';

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
      <div className="flex w-full h-full pb-8 md:pb-32">Votre gite</div>
      <Temoignages />
    </Layout>
  );
}

export default VotreGite;
