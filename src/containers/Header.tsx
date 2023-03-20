import React, { useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import NavLink from '@/components/NavLink';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import {
  APP_NAME,
  ROUTE_CONTACT,
  ROUTE_ACCUEIL,
  MENU,
  ROUTE_VOTRE_GITE,
  ROUTE_RESERVATION,
  ROUTE_NOUS_CONNAITRE,
} from '@/utils';
import ButtonCall from '@/components/buttons/ButtonCall';
import { useRouter } from 'next/router';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [pathname, setPathname] = React.useState(ROUTE_ACCUEIL);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

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
        <div className="relative flex flex-col justify-center items-center w-full h-screen bg-header bg-center bg-no-repeat bg-cover">
          <div className="bg-[rgba(255,255,255,0.92)] absolute top-0 left-0 flex items-center justify-center w-full px-10 h-24 bg-blend-darken">
            <div className="text-center h-full flex flex-1 gap-1 items-end pb-4 justify-center">
              <div className="h-full w-24 flex items-end">
                <img src="/assets/images/logo.png" alt="logo Gite de la Gare" />
              </div>
              <span className="text-sm leading-4 text-left w-full text-app-brown font-semibold">
                LE GITE DE
                <br />
                LA GARE
              </span>
            </div>
            <div className="text-center h-full flex flex-3 items-end justify-end pr-2">
              <nav
                className={`hidden md:flex justify-end h-full items-center gap-5`}>
                {data?.data?.data?.length ? (
                  <>
                    {data.data.data
                      .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
                      .map((item: any, index: any) => (
                        <NavLink
                          active={`${item.libelle}-${item.id}` === pathname}
                          href={`${item.libelle}-${item.id}`}
                          key={`memu-${index}-${item.id}`}>
                          {item.libelle}
                        </NavLink>
                      ))}
                  </>
                ) : (
                  <>
                    <NavLink
                      active={ROUTE_ACCUEIL === pathname}
                      href={ROUTE_ACCUEIL}>
                      Accueil*
                    </NavLink>
                    <NavLink
                      active={ROUTE_VOTRE_GITE === pathname}
                      href={ROUTE_VOTRE_GITE}>
                      Votre gite
                    </NavLink>
                    <NavLink
                      active={ROUTE_RESERVATION === pathname}
                      href={ROUTE_RESERVATION}>
                      Réservation
                    </NavLink>
                    <NavLink
                      active={ROUTE_NOUS_CONNAITRE === pathname}
                      href={ROUTE_NOUS_CONNAITRE}>
                      Nous connaître
                    </NavLink>
                    <NavLink
                      active={ROUTE_CONTACT === pathname}
                      href={ROUTE_CONTACT}>
                      Contact
                    </NavLink>
                  </>
                )}
                <ButtonCall />
              </nav>
              <button
                onClick={toggle}
                className="md:hidden p-2 mb-4 flex justify-center items-center rounded-md bg-app-yellow text-app-brown font-semibold">
                <HiOutlineMenuAlt2 className="w-8 h-8" />
              </button>
            </div>
            <nav
              className={`flex ${
                isOpen ? '' : 'hidden'
              } w-full h-screen fixed z-10 top-0 left-0 bg-white flex-col pt-[20%] items-center gap-4`}>
              <button
                onClick={toggle}
                className="rounded-full p-2 absolute top-[5%] border-2 border-app-black">
                <RxCross1 />
              </button>
              {data?.data?.data?.length ? (
                <>
                  {data.data.data
                    .sort((a: any, b: any) => (a.ordre > b.ordre ? 1 : -1))
                    .map((item: any, index: any) => (
                      <NavLink
                        active={`${item.libelle}-${item.id}` === pathname}
                        href={`${item.libelle}-${item.id}`}
                        key={`memu-${index}-${item.id}`}>
                        {item.libelle}
                      </NavLink>
                    ))}
                </>
              ) : (
                <>
                  <NavLink
                    active={ROUTE_ACCUEIL === pathname}
                    href={ROUTE_ACCUEIL}>
                    Accueil
                  </NavLink>
                  <NavLink
                    active={ROUTE_VOTRE_GITE === pathname}
                    href={ROUTE_VOTRE_GITE}>
                    Votre gite
                  </NavLink>
                  <NavLink
                    active={ROUTE_RESERVATION === pathname}
                    href={ROUTE_RESERVATION}>
                    Réservation
                  </NavLink>
                  <NavLink
                    active={ROUTE_NOUS_CONNAITRE === pathname}
                    href={ROUTE_NOUS_CONNAITRE}>
                    Nous connaître
                  </NavLink>
                  <NavLink
                    active={ROUTE_CONTACT === pathname}
                    href={ROUTE_CONTACT}>
                    Contact
                  </NavLink>
                </>
              )}
              <ButtonCall />
            </nav>
          </div>
          <div
            className="flex flex-col w-[65%] rounded-3xl p-2 h-[50%] justify-center items-center backdrop-blur-sm"
            style={{ background: '#42210B73 0% 0% no-repeat padding-box' }}>
            <h1 className="text-4xl break-before-avoid text-center w-full text-white font-bold">
              Lorem ipsum dolor sit amet, consectetuer.
            </h1>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
