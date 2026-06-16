import type { MultiSelectProps } from "@/types";
import styles from "./styles.module.scss";

export const MultiSelect = ({
  label,
  value,
  options,
  onChange,
  className = "",
  ...props
}: MultiSelectProps) => {
  return (
    <label className={`${styles.field} ${className}`}>
      <span>{label}</span>
      <select
        {...props}
        multiple
        value={value}
        onChange={(event) =>
          onChange(
            Array.from(event.target.selectedOptions, (option) => option.value),
          )
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
