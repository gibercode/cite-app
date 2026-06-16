import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.value)),
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((currentValue) => currentValue !== optionValue));
      return;
    }

    onChange([...value, optionValue]);
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((currentValue) => currentValue !== optionValue));
  };

  return (
    <div className={`${styles.field} ${className}`} ref={fieldRef}>
      <span>{label}</span>
      <button
        {...props}
        aria-expanded={isOpen}
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span className={styles.value}>
          {selectedOptions.length ? (
            selectedOptions.map((option) => (
              <span className={styles.chip} key={option.value}>
                {option.label}
                <span
                  aria-label={`Quitar ${option.label}`}
                  className={styles.removeChip}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      removeOption(option.value);
                    }
                  }}
                >
                  <X aria-hidden="true" size={12} />
                </span>
              </span>
            ))
          ) : (
            <span className={styles.placeholder}>Seleccionar</span>
          )}
        </span>
        <ChevronDown aria-hidden="true" className={styles.chevron} size={16} />
      </button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => {
            const isSelected = value.includes(option.value);

            return (
              <button
                className={styles.option}
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
              >
                <span
                  className={`${styles.checkbox} ${
                    isSelected ? styles.checked : ""
                  }`}
                >
                  {isSelected && <Check aria-hidden="true" size={13} />}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
