import NavLink from 'components/NavLink';
import React from 'react';
import { APP_NAME, ROUTE_CONTACT, ROUTE_ROOT } from 'utils/constants';

const Header = () => {
  return (
    <div className="flex text-white flex-col w-full h-32 bg-black justify-between">
      <div className="text-center flex-1 flex items-center justify-center">
        <h1 className='text-2xl font-semibold'>{APP_NAME}</h1>
      </div>
      <nav className="flex gap-4 pb-2 w-full items-end justify-end pr-10">
        <NavLink href={ROUTE_ROOT}>Accueil</NavLink>
        <NavLink href={ROUTE_CONTACT}>Contact</NavLink>
      </nav>
    </div>
  );
};

export default Header;
