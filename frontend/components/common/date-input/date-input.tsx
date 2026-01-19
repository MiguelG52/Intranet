import FieldInput from "../field-input/field-input";
import { DateInputProps } from "./date-input.type";
import { FieldValues } from "react-hook-form";
import { Calendar } from "lucide-react";

const DateInput = <T extends FieldValues>({
  Icon, ...props
}: DateInputProps<T>) => {
  return (
    <FieldInput
      {...props}
      type="date"
      Icon={Icon || Calendar}
    />
  );
}
export default DateInput;
