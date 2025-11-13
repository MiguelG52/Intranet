import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type InputProps = {
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    label?: string;
    type?: string;
    placeholder?: string;
    isRequired?: boolean;
    iconColor?: string;
    name:string
}