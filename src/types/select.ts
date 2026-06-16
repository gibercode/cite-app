export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
};
