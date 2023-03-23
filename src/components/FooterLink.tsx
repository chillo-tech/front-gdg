import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  href: string;
  className?: string;
  children: any;
};

function FooterLink({ href, className, children }: Props) {
  return (
    <Link
      className={classNames(
        'flex justify-center w-full items-center text-center mb-1 text-md hover:text-white text-[#FFFFFF80] transition-all duration-300 ease-out',
        className
      )}
      href={href}>
      {children}
    </Link>
  );
}

export default FooterLink;
