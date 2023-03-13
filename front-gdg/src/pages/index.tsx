import Head from 'next/head'
import styles from 'styles/Home.module.css'
import 'styles/global.css'
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
