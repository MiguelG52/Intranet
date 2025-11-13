import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface FieldInputProps<T extends FieldValues>{
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    label?: string;
    type?: string;
    placeholder?: string;
    isRequired?: boolean;
    iconColor?: string;
    name:Path<T>;
    control:Control<T>;
}