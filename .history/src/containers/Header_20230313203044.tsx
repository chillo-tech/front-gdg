import Link from 'next/link';
import React from 'react';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <nav className='flex flex-row gap-2 items-center'>
        <div className=''>
           <Link href="/">Accueil</Link>
        </div>
        <div className=''>
          <Link href="/">Accueil</Link>
        </div>
    </nav>
  );
};

export default Header;
