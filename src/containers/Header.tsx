import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import NavLink from '@/components/NavLink';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import { APP_NAME, ROUTE_CONTACT, ROUTE_ROOT, MENU } from '@/utils';
import ButtonCall from '@/components/buttons/ButtonCall';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { isSuccess, data } = useQuery<any>({
    queryKey: ['menus'],
    queryFn: () =>
      fetchData({
        path: 'menu',
        fields: MENU,
      }),
  });
  return (
    <>
      {isSuccess || !isSuccess ? (
        <div className="flex justify-between w-full h-screen bg-header">
          <div className="bg-[rgba(255,255,255,0.92)] flex w-full h-24 bg-blend-darken">
            <div className="text-center h-full flex-1 flex items-center justify-center">
              <span className="text-sm text-left text-app-brown font-semibold">
                LE GITE DE
                <br />
                LA GARE
              </span>
            </div>
            <div className="text-center h-full flex-1 flex items-center justify-end pr-2">
              <button
                onClick={toggle}
                className="p-2 flex justify-center items-center rounded-md bg-app-yellow text-app-brown font-semibold">
                <HiOutlineMenuAlt2 className="w-8 h-8" />
              </button>
            </div>
            <nav
              className={`flex ${
                isOpen ? '' : 'hidden'
              } w-full h-screen fixed top-0 left-0 bg-white flex-col pt-[35%] items-center gap-4`}>
              <button
                onClick={toggle}
                className="md:hidden rounded-full p-2 absolute top-[5%] border-2 border-app-black">
                <RxCross1 />
              </button>
              {data?.data?.data?.length ? (
                <>
                  {data.data.data
                    .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
                    .map((item: any, index: any) => (
                      <NavLink
                        href={`${item.libelle}-${item.id}`}
                        key={`memu-${index}-${item.id}`}>
                        {item.libelle}
                      </NavLink>
                    ))}
                </>
              ) : (
                <>
                  <NavLink href={ROUTE_ROOT}>Accueil</NavLink>
                  <NavLink href={ROUTE_ROOT}>Votre gite</NavLink>
                  <NavLink href={ROUTE_ROOT}>Réservation</NavLink>
                  <NavLink href={ROUTE_ROOT}>Nous connaître</NavLink>
                  <NavLink href={ROUTE_CONTACT}>Contact</NavLink>
                </>
              )}
              <ButtonCall />
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
