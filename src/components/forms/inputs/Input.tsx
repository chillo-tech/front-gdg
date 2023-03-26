import React from 'react';
import classNames from 'classnames';
import { FieldError, UseFormWatch } from 'react-hook-form/dist/types';
import { AnyAaaaRecord } from 'dns';
import { FormSchema } from '../CustomForm';

type Props = {
  className?: string;
  contentClassName?: string;
  placeholder: string;
  value?: string;
  type: string;
  label?: string;
  name: string;
  error?: FieldError;
  register: Function;
};

function Input({
  className,
  contentClassName,
  label,
  value,
  type,
  name,
  placeholder,
  error,
  register,
}: Props) {

  return (
    <div
      className={classNames(
        'flex-1 md:flex items-baseline gap-4 mt-4 mb-0 md:mb-8',
        className
      )}>
      <div className="w-full relative">
        <label className="text-app-black opacity-25 absolute -top-3 text-xs" htmlFor={name}>
          {value ? placeholder : ''}
        </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={classNames(
            'w-full text-left px-0 py-2 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-app-yellow',
            contentClassName
          )}
          {...register(name)}
        />
        <p className="text-red-500 text-sm text-center absolute -bottom-6">
          {error?.message}
        </p>
      </div>
    </div>
  );
}

export default Input;
