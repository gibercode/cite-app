import { useState } from "react";
import { Controller } from "react-hook-form";
import { Building2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input } from "@/components";
import { loginWithEmailAndPassword, loginWithGoogle } from "@/services/auth";
import type { LocationState, LoginFormValues } from "@/types";
import styles from "./styles.module.scss";
import { loginValidationRules, useLoginForm } from "./useLoginForm";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useLoginForm();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname ?? "/dashboard";

  const handleEmailLogin = async (values: LoginFormValues) => {
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithEmailAndPassword(values.email, values.password);
      navigate(redirectTo, { replace: true });
    } catch {
      setError("No se pudo iniciar sesion con esas credenciales.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch {
      setError("No se pudo iniciar sesion con Google.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.brand}>
          <Building2 aria-hidden="true" size={28} strokeWidth={2.4} />
          <span>CITE</span>
        </div>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Acceso seguro</p>
          <h1>Iniciar sesion</h1>
          <p>Ingresa con tu usuario o con tu cuenta de Google.</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(handleEmailLogin)}>
          <Controller
            control={control}
            name="email"
            rules={loginValidationRules.email}
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="email"
                label="Correo"
                placeholder="correo@empresa.com"
                type="email"
              />
            )}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <Controller
            control={control}
            name="password"
            rules={loginValidationRules.password}
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="current-password"
                label="Contrasena"
                placeholder="Tu contrasena"
                type="password"
              />
            )}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <Button disabled={isSubmitting} type="submit">
            Entrar
          </Button>
        </form>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <button
          className={styles.googleButton}
          disabled={isSubmitting}
          type="button"
          onClick={handleGoogleLogin}
        >
          Continuar con Google
        </button>
      </section>
    </main>
  );
};
