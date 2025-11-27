import { Control, FieldValues, Path } from "react-hook-form";
import { LucideIcon } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  Icon?: LucideIcon;
  isRequired?: boolean;
  iconColor?: string;
}
