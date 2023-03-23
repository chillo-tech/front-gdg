import React from 'react';
import ReservationForm from '@/components/forms/CustomForm';
import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import { APP_NAME, HEADER_RESERVATION } from '@/utils';
import Head from 'next/head';

function Reservation() {
  return (
    <Layout
      headerTitle={HEADER_RESERVATION.title}
      headerChildren={<SubTitle subtitle={HEADER_RESERVATION} />}>
      <Head>
        <title> {APP_NAME} | Réservation</title>
      </Head>
      <div className="flex w-full h-full pb-8 md:pb-32">
        <ReservationForm
          title="Confirmer votre reservation"
          messageTitle="Description"
          action={(data: any) => console.log(data)}
        />
      </div>
    </Layout>
  );
}

export default Reservation;
