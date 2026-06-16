import type { InputHTMLAttributes } from "react";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label: string;
  onChange: (value: string) => void;
};
