import type { InputProps } from "@/types";
import styles from "./styles.module.scss";

export const Input = ({
  label,
  onChange,
  className = "",
  ...props
}: InputProps) => {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>
      <input {...props} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
};
