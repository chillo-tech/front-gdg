import React from 'react';
import { HiPhone } from 'react-icons/hi';
import classNames from 'classnames';
import { CONTACT_PHONE_NUMBER } from '@/utils';
import Link from 'next/link';

type Props = {
  className?: string;
};

function ButtonCall({ className }: Props) {
  const call = async () => {
    window.open(CONTACT_PHONE_NUMBER.url);
  };

  return (
    <button
      onClick={call}
      className={classNames(
        'md:hidden flex cursor-pointer items-center justify-center h-24 w-full absolute bottom-0 left-0 bg-app-yellow text-white text-md',
        className
      )}>
      <span className="mr-2 rounded-full p-2 border-2 border-white">
        <HiPhone />
      </span>

      <Link href={CONTACT_PHONE_NUMBER.url}>{CONTACT_PHONE_NUMBER.label}</Link>
    </button>
  );
}

export default ButtonCall;
