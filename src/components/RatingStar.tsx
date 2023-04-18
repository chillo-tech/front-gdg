import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function RatingStar({ classNames, rate }: { classNames?: string; rate?: number }) {
  return (
    <>
      {rate ? (
        <div className={`flex gap-2 md:my-2 ${classNames}`}>
          {[1, 2, 3, 4, 5].map((note) => {
            if (note <= rate)
              return <AiFillStar key={`rating-${note}`} className="text-app-yellow" />;
            else return <AiOutlineStar key={`rating-${note}`} />;
          })}
        </div>
      ) : null}
    </>
  );
}

export default RatingStar;
