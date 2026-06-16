import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label: string;
  onChange: (value: string) => void;
};
