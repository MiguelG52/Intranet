'use client';

import { Input } from '@/components/ui/input';
import { InputProps } from './input.type';

const CustomInput = ({ Icon, placeholder, label, type, isRequired, iconColor, name }: InputProps) => {
  
  if (!iconColor) iconColor = 'primary';

  return (
    <fieldset className="flex flex-col gap-2">
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
      <div
        className="flex gap-2 items-center w-full border-2 px-5 py-1 rounded-3xl focus-within:ring-2 focus-within:ring-ring/50 "
      >
        {Icon && <Icon className={`text-${iconColor} w-5`} />}
        <Input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          required={isRequired}
          className={`pl-${Icon ? '10' : '4'} border-0 shadow-none`}
        />
      </div>
    </fieldset>
  );
};

export default CustomInput;