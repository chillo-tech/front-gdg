import React from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form/dist/types';
import { BiDownArrow } from 'react-icons/bi';

export type option = {
  value: any;
  label: string;
};

type Props = {
  className?: string;
  placeholder: string;
  values: option[];
  label?: string;
  name: string;
  error?: FieldError;
  register: Function;
};

function Select({
  className,
  label,
  values,
  name,
  placeholder,
  error,
  register,
}: Props) {
  return (
    <div className={classNames('md:flex w-full items-baseline gap-4 my-6 md:my-2', className)}>
      <div className='w-full'>
        <label className="text-black font-semibold" htmlFor={name}>
          {label}
        </label>
        <div className="flex w-full relative gap-[1px] items-center pr-5">
          <select
            id={name}
            className={
              'w-full text-black opacity-60 px-0 py-4 md:py-2 border-0 border-b-2 md:border-b-0 border-gray-400 appearance-none focus:border-app-yellow focus:outline-none focus:ring-0'
            }
            {...register(name)}>
            <option disabled selected value={''}>
              {placeholder}
            </option>
            {values.map((option: option, index: number) => (
              <option key={`c-${name}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-red-500 text-center">{error ? error.message : ''}</p>
      </div>
    </div>
  );
}

export default Select;
