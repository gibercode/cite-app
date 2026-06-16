import type { SelectProps } from "@/types";
import styles from "./styles.module.scss";

export const Select = ({
  label,
  value,
  options,
  onChange,
  className = "",
}: SelectProps) => {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
