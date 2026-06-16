import { useForm } from "react-hook-form";
import type { LoginFormValues } from "@/types";

export const loginValidationRules = {
  email: {
    required: "El correo es requerido",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un correo valido",
    },
  },
  password: {
    required: "La contrasena es requerida",
    minLength: {
      value: 6,
      message: "La contrasena debe tener al menos 6 caracteres",
    },
  },
};

export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
