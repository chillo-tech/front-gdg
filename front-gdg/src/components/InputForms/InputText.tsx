import { Label } from 'flowbite-react';
import React from 'react';

type InputTextParams = {
  id: string;
  value: any;
  type: string;
  placeholder?: string;
};

const InputText = ({ id, value, type, placeholder }: InputTextParams) => {
  return (
    <div className="w-full">
      <div className="text-left mb-2 block">
        <Label htmlFor={id} color="text-secondary" value={value} />
      </div>
      <input
        className="text-white bg-[#447370] w-full rounded border-2 border-secondary placeholder-[#FFFFFF99]"
        type={type}
        id={id}
        placeholder={placeholder}
        color="text-white"
      />
    </div>
  );
};

export default InputText;
