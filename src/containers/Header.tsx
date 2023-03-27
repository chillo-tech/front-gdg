import React, { useContext, useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMenuAlt2, HiPhone } from 'react-icons/hi';
import NavLink from '@/components/NavLink';
import { useQuery } from 'react-query';
import { fetchData } from '@/services';
import {
  ROUTE_CONTACT,
  ROUTE_ACCUEIL,
  MENU,
  ROUTE_VOTRE_GITE,
  ROUTE_RESERVATION,
  ROUTE_NOUS_CONNAITRE,
} from '@/utils';
import ButtonCall from '@/components/buttons/ButtonCall';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Image from 'next/image';
import { ApplicationContext } from '@/context/ApplicationContext';
import Link from 'next/link';

type Props = {
  headerTitle: string;
  children?: any;
};

const Header = ({ children, headerTitle }: Props) => {
  const {
    updateData,
    state: { entreprise },
  } = useContext(ApplicationContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [menus, setMenus] = React.useState([]);
  const [pathname, setPathname] = React.useState(ROUTE_ACCUEIL);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  useQuery<any>({
    queryKey: ['menus'],
    queryFn: () =>
      fetchData({
        path: 'menu',
        fields: MENU,
      }),
    onSuccess: (data) => {
      setMenus(data.data.data);
      updateData({ menus: data.data.data });
    },
  });
  return (
    <>
      {menus && menus.length ? (
        <div
          className={classNames(
            pathname === ROUTE_ACCUEIL ? 'bg-header' : 'bg-contact',
            'relative flex flex-col justify-center items-center w-full h-screen bg-center bg-no-repeat bg-cover'
          )}>
          <div className="bg-[rgba(255,255,255,0.92)] absolute top-0 left-0 flex items-center justify-center w-full px-10 h-24 bg-blend-darken">
            <div className="text-center h-full flex flex-1 gap-1 items-end pb-4 justify-center">
              <div className="h-full w-36 md:w-28 flex flex-1 items-end">
                <Image
                  height={130}
                  width={160}
                  src="/assets/images/logo.png"
                  alt="logo Gite de la Gare"
                />
              </div>
            </div>
            <div className="text-center h-full flex flex-3 items-end justify-end pr-2">
              <nav
                className={`hidden md:flex justify-end h-full items-center gap-5`}>
                {menus && false ? (
                  <>
                    {menus ? (
                      <ul className="flex flex-col md:flex-row items-center justify-center">
                        {menus
                          .sort((a: any, b: any) =>
                            a.ordre > b.ordre ? 1 : -1
                          )
                          .map((menu: any) => (
                            <li key={`footer-${menu.id}-item`}>
                              <Link
                                className="block py-1 px-5 text-[#FFFFFF80] hover:text-app-gray"
                                href={`${menu.slug}`}>
                                {menu.libelle}
                              </Link>
                              <NavLink
                                active={`${menu.slug}` === pathname}
                                href={`${menu.slug}`}>
                                {menu.libelle}
                              </NavLink>
                            </li>
                          ))}
                        {entreprise && entreprise.contact ? (
                          <Link
                            href={`tel:${entreprise.contact[0].item.telephone}`}
                            className="bg-app-yellow px-3 py-5 flex items-center justify-center text-app-white">
                            <span className="mr-2 rounded-full p-2 border-2 border-white">
                              <HiPhone />
                            </span>
                            {entreprise.contact[0].item.telephone}
                          </Link>
                        ) : null}
                      </ul>
                    ) : null}
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
              {menus && false ? (
                <>
                  {menus
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
          </div>
          <div
            className="flex flex-col gap-4 w-11/12 md:w-5/6 rounded-3xl p-2 mt-20 pt-8 pb-16 h-[80%] md:h-[55%] justify-center items-center backdrop-blur-sm"
            style={{ background: '#42210B73 0% 0% no-repeat padding-box' }}>
            <h1 className="text-5xl break-before-avoid text-center w-full text-white font-bold">
              {headerTitle}
            </h1>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
