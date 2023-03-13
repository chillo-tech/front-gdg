import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <nav className='flex flex-row gap-2 items-center'>
        <div className=''>
           <Link href="/">Accueil</Link>
        </div>
        <div className=''>
          <Link href="/contact">Contact</Link>
        </div>
    </nav>
  );
};

export default Header;
