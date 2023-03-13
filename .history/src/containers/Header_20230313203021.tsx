import Link from 'next/link';
import React from 'react';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <nav className='flex flex-row gap-2 items-center'>
        <div className=''>
           <Link href="/"></Link> Home</a>
        </div>
        <div className=''>
            <a href={ROUTE_CONTACT}>Contact</a>
        </div>
    </nav>
  );
};

export default Header;
