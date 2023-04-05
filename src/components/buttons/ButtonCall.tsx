import React from 'react';
import { HiPhone } from 'react-icons/hi';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  className?: string;
  tel: string;
};

function ButtonCall({ className, tel }: Props) {
  const call = async () => {
    window.open(`tel:${tel}`);
  };

  return (
    <button
      onClick={call}
      className={classNames(
        'flex absolute bottom-0 left-0 cursor-pointer px-2 h-24 w-full items-center justify-center bg-app-yellow text-white text-md',
        'md:relative md:w-fit md:h-full md:pt-4',
        className
      )}>
      <span className="mr-2 rounded-full p-2 border-2 border-white">
        <HiPhone />
      </span>

      <Link href={`tel:${tel}`}>{tel}</Link>
    </button>
  );
}

export default ButtonCall;
