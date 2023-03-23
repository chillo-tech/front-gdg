import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: any;
};

function Button({ title, type = 'button', className, onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick ? onClick : () => {}}
        type={type}
        className={classNames(
          `     w-full
                text-white
                rounded-md
                border-0
                py-2
                px-6
                transition
                hover:bg-opacity-80
                `,
          className ? className : 'bg-app-green'
        )}>
        {title}
      </button>
    </div>
  );
}

export default Button;
