import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  title: string;
  icon?: any;
  type?: 'button' | 'submit' | 'reset';
  onClick?: any;
};

function Button({icon, title, type = 'button', className, onClick }: Props) {
  return (
    <div>
      <button
        onClick={onClick ? onClick : () => {}}
        type={type}
        className={classNames(
          `     w-full
                rounded-md
                border-0
                py-2
                px-6
                transition
                hover:bg-opacity-80
                `,
          className ? className : 'bg-app-green text-white'
        )}>
          {
            icon ? icon : null
          }
        {title}
      </button>
    </div>
  );
}

export default Button;
