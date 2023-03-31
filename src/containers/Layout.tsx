import React, { useContext } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import { ENTREPRISE } from '@/utils';
import { ApplicationContext } from '@/context/ApplicationContext';

function Layout({
  children,
  headerTitle,
  headerChildren,
}: {
  children: any;
  headerTitle: string;
  headerChildren?: any;
}) {
  const context = useContext(ApplicationContext);
  const { updateData } = context;

  useQuery<any>({
    queryKey: ['entreprises'],
    queryFn: () =>
      fetchData({
        path: 'etablissement',
        fields: ENTREPRISE,
      }),
    onSuccess: (data) => {
      updateData({ entreprise: data.data.data[0] });
    },
  });

  return (
    <>
      <Head>
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </>
      </Head>
      <section className="w-full selection:bg-app-yellow selection:text-white min-h-screen relative bg-slate-200 flex flex-col justify-between items-center">
        <Header headerTitle={headerTitle}>
          {headerChildren ? headerChildren : null}
        </Header>
        <main className="w-full bg-white">{children}</main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;
