import ContactForm from '@/components/forms/CustomForm';
import Layout from '@/containers/Layout';
import Head from 'next/head';
import React from 'react';
import { APP_NAME, HEADER_CONTACT } from '@/utils/constants';
import SubTitle from '@/components/texts/SubTitle';
import AvisUtilisateurs from '@/components/home/AvisUtilisateurs';

const ContactPage = () => {
  return (
    <Layout
      headerChildren={<SubTitle subtitle={HEADER_CONTACT} />}>
      <Head>
        <title> {APP_NAME} | Contactez-nous</title>
      </Head>
      <div className="flex w-full h-full pt-10 md:pt-28 pb-8 md:pb-32">
        <ContactForm
          title="Contactez nous"
          messageTitle="Objet du message"
          action={(data: any) => console.log(data)}
        />
      </div>
      <AvisUtilisateurs />
    </Layout>
  );
};

export default ContactPage;
