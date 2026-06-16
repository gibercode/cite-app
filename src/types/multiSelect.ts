import type { ButtonHTMLAttributes } from "react";
import type { SelectOption } from "./select";

export type MultiSelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "value"
> & {
  label: string;
  value: string[];
  options: SelectOption[];
  onChange: (value: string[]) => void;
};
