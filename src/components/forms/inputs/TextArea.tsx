import React from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form/dist/types';

type Props = {
  className?: string;
  rows?: number;
  placeholder: string;
  label?: string;
  name: string;
  error?: FieldError;
  register: Function;
};

function TextArea({
  className,
  label,
  rows = 2,
  name,
  placeholder,
  error,
  register,
}: Props) {
  return (
    <div
      className={classNames(
        'md:flex text-left px-0 items-baseline gap-4 my-4 w-full',
        className
      )}>
      <div className="w-full">
        <label
          className="text-black"
          htmlFor={name}>
          {label}
        </label>
        <textarea
          id={name}
          rows={rows}
          {...register(name)}
          placeholder={placeholder}
          className="scrollbar-hide w-full py-4 text-left px-0 resize-none outline-none
                        bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow"></textarea>
        <p className="text-red-500 text-left">{error ? error.message : ''}</p>
      </div>
    </div>
  );
}

export default TextArea;
