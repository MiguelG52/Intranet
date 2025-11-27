import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { SelectInputProps } from "./select-input.type"
import { Controller, FieldValues } from "react-hook-form";

const SelectInput = <T extends FieldValues>({
  Icon, label, options, placeholder, isRequired, iconColor, name, control
}: SelectInputProps<T>) => {
  if (!iconColor) iconColor = 'primary';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name} className="text-sm font-medium text-gray-700">{label}</FieldLabel>}

          <div className="flex gap-2 items-center w-full border-2 px-5 py-1 rounded-3xl focus-within:ring-2 focus-within:ring-ring/50">
            {Icon && <Icon className={`text-${iconColor} w-5`} />}
            <select
              {...field}
              id={name}
              required={isRequired}
              className="w-full bg-transparent border-none focus:ring-0 py-2 text-sm outline-none"
            >
              {placeholder && <option value="">{placeholder}</option>}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {fieldState.invalid && (
            <FieldError className="ml-5" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
export default SelectInput;
