import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Head from 'next/head';

function Layout({
  children,
  headerTitle,
  headerChildren,
}: {
  children: any;
  headerTitle: string;
  headerChildren?: any;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full min-h-screen relative bg-slate-200 flex flex-col justify-between items-center">
        <Header headerTitle={headerTitle}>{headerChildren ? headerChildren : null}</Header>
        <main className="w-full pt-8 md:pt-28 bg-white">{children}</main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;
