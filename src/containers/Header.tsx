import NavLink from '@/components/NavLink';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import {APP_NAME, ROUTE_CONTACT, ROUTE_ROOT,  MENU } from '@/utils';

const Header = () => {
  const {
    isSuccess,
    data,
  } = useQuery<any>({
    queryKey: ["menus"],
    queryFn: () =>
      fetchData({
        path: "menu",
        fields: MENU
      })  
   });
  return (
    <>
      {
        isSuccess ? (
          <div className="flex text-white flex-col w-full h-32 bg-black justify-between">
            <div className="text-center flex-1 flex items-center justify-center">
              <h1 className='text-2xl font-semibold'>{APP_NAME}</h1>
            </div>
            <nav className="flex gap-4 pb-2 w-full items-end justify-end pr-10">
              {
                data.data.data.length ? (
                    <>
                      {data.data.data
                        .sort((a: any, b:any) => a.ordre > b.ordre ? 1 : -1)
                        .map((item: any, index: any) => <NavLink href={`${item.libelle}-${item.id}`} key={`memu-${index}-${item.id}`}>
                          {item.libelle}
                        </NavLink>)}
                    </>
                ) : null
              }
            </nav>
          </div>
        ): null
      }
    </>
  );
};

export default Header;
