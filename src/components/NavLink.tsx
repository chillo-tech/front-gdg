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
        'uppercase font-semibold text-lg hover:text-app-yellow',
        active ? 'text-app-yellow' : 'text-app-black',
        className
      )}
      href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
