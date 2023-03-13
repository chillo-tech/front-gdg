import { Label } from 'flowbite-react';
import React from 'react';

type SelectInputParams = {
  id: string;
  children: any;
  value: any;
  placeholder?: string;
};

const SelectInput = ({
  id,
  children,
  value,
  placeholder,
}: SelectInputParams) => {
  return (
    <div className="w-full">
      <div className="text-left mb-2 block">
        <Label htmlFor={id} color="text-secondary" value={value} />
      </div>
      <select
        id={id}
        placeholder={placeholder}
        color="text-white"
        className="text-white bg-[#447370] w-full rounded border-2 border-secondary py-2">
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
