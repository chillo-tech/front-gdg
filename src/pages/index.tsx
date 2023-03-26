import Head from 'next/head';
import { APP_DESCRIPTION, APP_NAME, HEADER_ACCUEIL } from '@/utils/constants';
import Layout from '@/containers/Layout';
import Spaces from '@/components/home/Spaces';
import SearchBar from '@/containers/SearchBar';
import Description from '@/components/home/Description'
import AvisUtilisateurs from '@/components/home/AvisUtilisateurs'
import NousTrouver from '@/components/home/NousTrouver'

export default function Home() {
  return (
    <Layout headerTitle={HEADER_ACCUEIL.title} headerChildren={<SearchBar />}>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
      </Head>

      <Spaces />
      <NousTrouver />
      <AvisUtilisateurs />
    </Layout>
  );
}
