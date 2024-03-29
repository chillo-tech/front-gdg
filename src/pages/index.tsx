import Head from 'next/head'
import { APP_DESCRIPTION, APP_NAME, HEADER_ACCUEIL } from '@/utils/constants'
import Layout from '@/containers/Layout'

export default function Home() {
  return (
    <Layout headerTitle={HEADER_ACCUEIL.title}>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
      </Head>
      <section>
        Accueil
      </section>
    </Layout>
  )
}
