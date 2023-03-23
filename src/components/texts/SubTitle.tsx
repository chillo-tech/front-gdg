import { HeaderSubTitle } from '@/utils';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type SubTitleProps = {
  subtitle: HeaderSubTitle;
};

function SubTitle({ subtitle }: SubTitleProps) {
  return (
    <p className="w-full text-center text-md font-semibold">
      <>
        {subtitle?.previousPages?.map((previousPage, index) => {
          return (
            <Link key={index} href={previousPage.href} className="text-[#FFD75E80]">
              {previousPage.title}
              {index + 1 !== subtitle?.previousPages?.length ? (
                <IoIosArrowForward className="inline mx-2" />
              ) : (
                ''
              )}
            </Link>
          );
        })}
        <span className="text-app-yellow">
          {subtitle?.previousPages?.length ? (
            <IoIosArrowForward className="inline mx-2" />
          ) : (
            ''
          )}
          {subtitle.title}
        </span>
      </>
    </p>
  );
}

export default SubTitle;
