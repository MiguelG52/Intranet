import { Control, FieldValues, Path } from "react-hook-form";
import { LucideIcon } from "lucide-react";

export interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  Icon?: LucideIcon;
  isRequired?: boolean;
  iconColor?: string;
}
