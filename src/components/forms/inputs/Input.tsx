import React from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form/dist/types';

type Props = {
  className?: string;
  placeholder: string;
  type: string;
  label?: string;
  name: string;
  error?: FieldError;
  register: Function;
};

function Input({
  className,
  label,
  type,
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
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={
            'w-full px-4 py-2 bg-transparent rounded-md border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0'
          }
          {...register(name)}
        />
        <p className='text-red-500 text-center' >{error ? error.message : ''}</p>
      </div>
    </div>
  );
}

export default Input;
