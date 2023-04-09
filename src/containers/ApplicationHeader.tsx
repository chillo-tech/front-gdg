import NavLink from '@/components/NavLink';
import ImageDisplay from '@/components/image-display'
import { ApplicationContext } from '@/context/ApplicationContext';
import { fetchData } from '@/services';
import { MENU } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { HiOutlineMenuAlt2, HiPhone } from 'react-icons/hi';
import { RxCross1 } from 'react-icons/rx';
import { useQuery } from 'react-query';

function ApplicationHeader() {

  const {
    updateData,
    state: { headerClasses = 'absolute', entreprise, menus },
  } = useContext(ApplicationContext);
  const [isOpen, setIsOpen] = React.useState(false);
  useQuery<any>({
    queryKey: ['menus'],
    queryFn: () =>
      fetchData({
        path: 'menu',
        fields: MENU,
      }),
    onSuccess: (data) => {
      updateData({ menus: data.data.data });
    },
  });
  const router = useRouter();
  
  return (
    <header className={classNames('w-full bg-white md:opacity-90 z-50',headerClasses )}>
      <div className="container flex justify-between items-center">
        <Link href={'/'} className='pt-8 pb-8 md:py-2 block'>
          <ImageDisplay 
              image={{path: '/assets/images/logo.png', title: `${entreprise ? entreprise.nom: 'gite de la gare'}`}} 
              local={true}
              unoptimized
              wrapperClasses="h-16 w-44 rounded-lg overflow-hidden relative" 
          />
        </Link>
        <button
          onClick={()=> setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md bg-app-yellow text-app-brown font-semibold">
          <HiOutlineMenuAlt2 className="w-8 h-8" />
        </button>
        <nav className={
          classNames(
            'md:block',
            {'block fixed inset-0 bg-white z-50': isOpen},
            {'hidden': !isOpen},
          )
        }>
          <>
            {menus && menus.length ? (
              <ul className="h-full flex flex-col md:flex-row items-center md:justify-center justify-between">
                <li className='md:hidden'>
                  <button
                    onClick={()=> setIsOpen(!isOpen)}
                    className="rounded-full p-2 absolute top-[5%] border-2 border-app-black">
                  <RxCross1 />
                </button>
                </li>
                <div className='flex flex-col md:flex-row'>
                {menus
                  .filter((menu:any) => menu.display)
                  .sort((a: any, b: any) =>
                    a.ordre > b.ordre ? 1 : -1
                  )
                  .map((menu: any) => (
                    <li key={`footer-${menu.id}-item`} className='px-4'>
                      <NavLink
                        active={`${menu.slug}` === router.pathname}
                        href={`/${menu.slug}`}>
                        {menu.libelle}
                      </NavLink>
                      
                    </li>
                  ))}
                </div>
                {entreprise && entreprise.contact ? (
                  <Link
                    href={`tel:${entreprise.contact[0].item.telephone}`}
                    className="w-full bg-app-yellow px-3 md:py-7 py-5 flex items-center justify-center text-app-white">
                    <span className="mr-2 rounded-full p-2 border-2 border-white">
                      <HiPhone />
                    </span>
                    {entreprise.contact[0].item.telephone}
                  </Link>
                ) : null}
              </ul>
            ) : null}
          </>
        </nav>
      </div>

    </header>
  )
}

export default ApplicationHeader
