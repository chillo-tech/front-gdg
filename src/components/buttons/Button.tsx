import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  title: string;
  type?: 'button' | 'submit' | 'reset';
};

function Button({ title, type = 'button', className }: Props) {
  return (
    <div>
      <button
        type={type}
        className={classNames(
          `
                w-full
                mt-5
                bg-stone-900
                text-white
                rounded
                border border-gray-600
                p-3
                transition
                hover:bg-opacity-90
                `,
          className
        )}>
        {title}
      </button>
    </div>
  );
}

export default Button;
