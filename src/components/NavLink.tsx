import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  href: string;
  active?: boolean;
  className?: string;
  children: any;
};

function NavLink({active, href, className, children }: Props) {
  return (
    <Link
      className={classNames(
        'md:whitespace-nowrap	block uppercase text-center font-semibold text-md hover:text-app-yellow md:border-b-4 md:hover:border-app-yellow pt-6 pb-1',
        active ? 'text-app-yellow md:border-app-yellow' : 'text-app-black md:border-transparent',
        className
      )}
      href={href}>
      {children}
    </Link>
  );
}


export default NavLink;
