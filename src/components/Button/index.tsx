import type { ButtonProps } from "@/types";
import styles from "./styles.module.scss";

export const Button = ({
  children,
  className = "",
  icon,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
