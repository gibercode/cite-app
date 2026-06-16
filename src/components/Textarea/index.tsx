import type { TextareaProps } from "@/types";
import styles from "./styles.module.scss";

export const Textarea = ({
  label,
  onChange,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>
      <textarea
        {...props}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};
