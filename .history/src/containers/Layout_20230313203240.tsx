import Footer from './Footer';
import Header from './Header';
import React from 'react';
import Head from 'next/head';

function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-full h-screen relative bg-slate-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;
