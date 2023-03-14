import ContactForm from 'components/forms/ContactForm';
import Layout from 'containers/Layout';
import Head from 'next/head';
import React from 'react';
import { APP_NAME } from 'utils/constants';

const ContactPage = () => {
  return (
    <Layout>
      <Head>
        <title> {APP_NAME} | Contactez-nous</title>
      </Head>
      <div className="flex w-full h-full">
        <div></div>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContactPage;
