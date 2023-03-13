import React from 'react';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <div className={`w-full flex h-64 `}>
    <nav className='flex flex-row gap-2 items-center'>
        <div className=''>
            <a href={ROUTE_ROOT}>Home</a>
        </div>
        <div className=''>
            <a href={ROUTE_CONTACT}>Contact</a>
        </div>
    </nav>
</div>
  );
};

export default Header;
