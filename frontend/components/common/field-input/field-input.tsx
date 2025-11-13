import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FieldInputProps } from "./field-input.type"
import { Controller, FieldValues } from "react-hook-form";

const FieldInput = <T extends FieldValues>({
  Icon, label, type, placeholder, isRequired, iconColor, name, control
}:FieldInputProps<T>) => {
  if (!iconColor) iconColor = 'primary';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState})=>(
        <Field
          data-invalid={fieldState.invalid}
        >
          {label && <FieldLabel htmlFor={name} className="text-sm font-medium text-gray-700">{label}</FieldLabel>}

          <div className="flex gap-2 items-center w-full border-2 px-5 py-1 rounded-3xl focus-within:ring-2 focus-within:ring-ring/50">
            {Icon && <Icon className={`text-${iconColor} w-5`} />}
            <Input
              {...field}
              name={name}
              id={name}
              type={type}
              placeholder={placeholder}
              required={isRequired}
              className={`pl-${Icon ? '10' : '4'} border-0 shadow-none`}
            />

          </div>
          {fieldState.invalid && (
            <FieldError className="ml-5" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  ); 
}
export default FieldInput;


