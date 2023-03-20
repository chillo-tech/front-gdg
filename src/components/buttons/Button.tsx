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
                bg-app-yellow
                text-white
                rounded
                border border-gray-600
                py-2
                px-6
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
