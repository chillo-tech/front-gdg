import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  href: string;
  className?: string;
  children: any;
};

function NavLink({ href, className, children }: Props) {
  return (
    <div
      className={classNames(
        'uppercase text-lg border-b-4 hover:border-white border-transparent',
        className
      )}>
      <Link href={href}>{children}</Link>
    </div>
  );
}

export default NavLink;
