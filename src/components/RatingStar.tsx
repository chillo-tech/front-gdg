import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function RatingStar({classNames, rate} : {classNames?: string, rate: number}) {
  return (
    <div className={`flex gap-2 md:my-2 ${classNames}`}>
      {[1, 2, 3, 4, 5].map((note) => {
        if (note < rate) return <AiFillStar className="text-app-yellow" />;
        else return <AiOutlineStar />;
      })}
    </div>
  );
}

export default RatingStar;
