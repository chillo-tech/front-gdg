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
      <section className="w-full min-h-screen relative bg-slate-200 flex flex-col justify-between items-center">
        <Header />
        <main className='w-[70%] mx-auto'>{children}</main>
        <Footer />
      </section>
    </>
  );
}

export default Layout;