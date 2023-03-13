import Head from 'next/head'
import { APP_DESCRIPTION, APP_NAME } from 'utils/constants'
import Layout from 'containers/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
      </Head>
      <main className={styles.main}>
        Home here 
      </main>
    </Layout>
  )
}
