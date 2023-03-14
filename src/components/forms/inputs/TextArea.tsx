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
        'md:flex items-baseline gap-4 mb-2 my-4',
        className
      )}>
      <label className="text-black" htmlFor={name}>
        {label}
      </label>
      <div>
        <textarea
          id={name}
          rows={rows}
          {...register(name)}
          placeholder={placeholder}
          className="w-full py-2 px-4 text-body-color text-base resize-none outline-none
                        bg-transparent rounded-md border-2 border-gray-600 appearance-none 
                        focus:outline-none focus:ring-0 focus-visible:shadow-none focus:border-primary"></textarea>
        <p className="text-red-500 text-center">{error ? error.message : ''}</p>
      </div>
    </div>
  );
}

export default TextArea;
