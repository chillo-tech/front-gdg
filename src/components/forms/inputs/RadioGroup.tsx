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
  values: option[];
  label?: string;
  name: string;
  error?: FieldError;
  register: Function;
};

function RadioGroup({
  className,
  label,
  values,
  name,
  error,
  register,
}: Props) {
  return (
    <div
      className={classNames(
        'flex items-baseline gap-4 mb-2 my-4 w-full justify-center',
        className
      )}>
      <div>
        <div className="flex relative gap-[1px] items-center justify-start pr-5">
          <div
            id={name}
            className={
              'w-full flex flex-col gap-4 px-4 py-2 bg-transparent appearance-none focus:outline-none focus:ring-0'
            }>
            {values.map((option: option, index: number) => (
              <div
                key={`c-${name}-${index}`}
                className="w-full flex justify-start gap-4 items-center">
                <input
                  {...register(name)}
                  type="radio"
                  className="cursor-pointer focus:outline-none focus:ring-0 checked:bg-app-green rounded-sm checked:text-app-green"
                  name={name}
                  id={`c-${name}-${index}`}
                  value={option.value}
                />
                <label
                  className={classNames(
                    'font-thin cursor-pointer',
                    error?.message ? 'text-red-500' : ''
                  )}
                  htmlFor={`c-${name}-${index}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioGroup;
