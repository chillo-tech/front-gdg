import SubTitle from '@/components/texts/SubTitle';
import Layout from '@/containers/Layout';
import Temoignages from '@/containers/Temoignages';
import { APP_NAME, HEADER_NOUS_CONNAITRE } from '@/utils';
import Head from 'next/head';
import React from 'react';

function NousConnaitre() {
  return (
    <Layout
      headerTitle={HEADER_NOUS_CONNAITRE.title}
      headerChildren={<SubTitle subtitle={HEADER_NOUS_CONNAITRE} />}>
      <Head>
        <title> {APP_NAME} | Nous Connaître</title>
      </Head>
      <div className="flex flex-col mb-8 md:mb-28 items-center font-thin text-center">
        <h1 className="w-full text-4xl">Qui sommes nous?</h1>
        <span className="ml-28 mt-4 h-[0.15rem] w-40 bg-app-black"></span>
      </div>
      <div className="flex flex-col gap-6 mb-8 md:mb-28 justify-center items-center text-center font-thin w-10/12 mx-auto">
        <p className="w-full">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </p>
        <p className="w-full">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <Temoignages />
    </Layout>
  );
}

export default NousConnaitre;
