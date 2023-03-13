import React from 'react';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <div className="flex bg-red-500 w-full h-64">
      <div className="flex w-full h-full">
        <HeaderMenu />
      </div>
    </div>
  );
};

export default Header;
