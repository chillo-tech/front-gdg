import { ROUTE_404, URL_DATA, parseURL } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Espaces({ espaces, uri }: { espaces: string; uri: URL_DATA }) {
  const router = useRouter();

  useEffect(() => {
    router.push(uri.route);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen dark:bg-app-black bg-app-white">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-yellow"></div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  let uri: URL_DATA = {
    route: ROUTE_404,
    label: '404',
    index: 0,
  };

  try {
    uri = parseURL(params?.espaces);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      ...params,
      uri: uri,
    }, // will be passed to the page component as props
  };
}

export default Espaces;
