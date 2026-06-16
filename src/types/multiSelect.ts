import type { SelectHTMLAttributes } from "react";
import type { SelectOption } from "./select";

export type MultiSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "multiple" | "onChange" | "value"
> & {
  label: string;
  value: string[];
  options: SelectOption[];
  onChange: (value: string[]) => void;
};
