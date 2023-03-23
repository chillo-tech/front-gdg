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
    <div
      className={classNames('md:flex items-baseline gap-4 mb-2 my-4', className)}>
      <label className="text-black" htmlFor={name}>
        {label}
      </label>
      <div>
        <div className="flex relative gap-[1px] items-center pr-5">
          <select
            id={name}
            className={
              'w-full px-4 py-2 bg-transparent rounded-md border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0'
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
          <BiDownArrow className='absolute right-1 mr-5' color='#00000033' />
        </div>
        <p className="text-red-500 text-center">{error ? error.message : ''}</p>
      </div>
    </div>
  );
}

export default Select;
