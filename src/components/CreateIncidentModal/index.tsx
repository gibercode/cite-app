import { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Map as MapView } from "@/components/Map";
import { MultiSelect } from "@/components/MultiSelect";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { CREATE_INCIDENT_STEPS, priorityOptions } from "@/constants";
import { useIncidentStore } from "@/store";
import type {
  CreateIncidentModalProps,
  Incident,
  IncidentFormValues,
  Priority,
} from "@/types";
import { getPersonOptions, getUniquePeople } from "@/utils";
import styles from "./styles.module.scss";
import {
  getTodayInputValue,
  useCreateIncidentForm,
  validateDueDate,
  validateImageAttachments,
} from "./useCreateIncidentForm";
import { buildCreateIncidentInput } from "./utils";

export const CreateIncidentModal = ({
  isOpen,
  onClose,
}: CreateIncidentModalProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const lastStepIndex = CREATE_INCIDENT_STEPS.length - 1;
  const isLastStep = stepIndex === lastStepIndex;
  const { addIncident, incidents } = useIncidentStore();

  const people = useMemo(() => getUniquePeople(incidents), [incidents]);

  const categoryOptions = useMemo(() => {
    const categoryMap = new Map<string, Incident["type"]>();

    incidents.forEach((incident) => {
      categoryMap.set(incident.type.id, incident.type);
    });

    return Array.from(categoryMap.values()).map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [incidents]);

  const tagOptions = useMemo(() => {
    const tagMap = new Map<string, Incident["tags"][number]>();

    incidents.forEach((incident) => {
      incident.tags.forEach((tag) => tagMap.set(tag.id, tag));
    });

    return Array.from(tagMap.values()).map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));
  }, [incidents]);

  const personOptions = useMemo(() => getPersonOptions(people), [people]);
  const createPriorityOptions = priorityOptions.filter(
    (option) => option.value !== "all",
  );

  const {
    control,
    attachmentPreviews,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    selectedCoordinates,
    selectCoordinates,
    trigger,
  } = useCreateIncidentForm({
    defaultCategoryId: categoryOptions[0]?.value ?? "",
  });

  if (!isOpen) return null;

  const closeModal = () => {
    reset();
    setStepIndex(0);
    onClose();
  };

  const nextStep = async () => {
    if (isLastStep) return;

    const fieldsByStep: Array<Array<keyof IncidentFormValues>> = [
      ["title", "description", "dueDate", "categoryId", "priority"],
      ["tagIds", "assigneeIds", "observerIds"],
      ["locationDescription", "latitude", "longitude"],
    ];
    const isValid = await trigger(fieldsByStep[stepIndex]);

    if (isValid) {
      setStepIndex((currentStep) => Math.min(currentStep + 1, lastStepIndex));
    }
  };

  const onSubmit = (values: IncidentFormValues) => {
    if (!isLastStep) return;

    addIncident(
      buildCreateIncidentInput({
        incidents,
        people,
        values,
      }),
    );

    closeModal();
  };

  return (
    <div className={styles.overlay} role="presentation">
      <section
        aria-labelledby="create-incident-title"
        aria-modal="true"
        className={styles.modal}
        role="dialog"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Nueva incidencia</p>
            <h2 id="create-incident-title">Crear incidencia</h2>
          </div>

          <button
            aria-label="Cerrar formulario"
            className={styles.closeButton}
            type="button"
            onClick={closeModal}
          >
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <div className={styles.steps} aria-label="Progreso del formulario">
          {CREATE_INCIDENT_STEPS.map((step, index) => (
            <span
              className={index === stepIndex ? styles.activeStep : ""}
              key={step}
            >
              {step}
            </span>
          ))}
        </div>

        <form
          className={styles.form}
          noValidate
          onSubmit={(event) => event.preventDefault()}
        >
          {stepIndex === 0 && (
            <div className={styles.grid}>
              <Controller
                control={control}
                name="title"
                rules={{ required: "El titulo es requerido" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    className={styles.full}
                    label="Titulo"
                    placeholder="Ej. Fuga en nivel 4"
                  />
                )}
              />
              {errors.title && (
                <p className={styles.error}>{errors.title.message}</p>
              )}

              <Controller
                control={control}
                name="description"
                rules={{ required: "La descripcion es requerida" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className={styles.full}
                    label="Descripcion"
                    placeholder="Describe el hallazgo y el contexto operativo"
                  />
                )}
              />
              {errors.description && (
                <p className={styles.error}>{errors.description.message}</p>
              )}

              <Controller
                control={control}
                name="dueDate"
                rules={{ validate: validateDueDate }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Fecha de vencimiento"
                    min={getTodayInputValue()}
                    type="date"
                  />
                )}
              />
              {errors.dueDate && (
                <p className={styles.error}>{errors.dueDate.message}</p>
              )}

              <Controller
                control={control}
                name="categoryId"
                rules={{ required: "La categoria es requerida" }}
                render={({ field }) => (
                  <Select
                    label="Categoria"
                    options={categoryOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select
                    label="Prioridad"
                    options={createPriorityOptions}
                    value={field.value}
                    onChange={(value) => field.onChange(value as Priority)}
                  />
                )}
              />
            </div>
          )}

          {stepIndex === 1 && (
            <div className={styles.grid}>
              <Controller
                control={control}
                name="tagIds"
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    className={styles.full}
                    label="Etiquetas"
                    options={tagOptions}
                  />
                )}
              />

              <Controller
                control={control}
                name="assigneeIds"
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    className={styles.full}
                    label="Asignados"
                    options={personOptions}
                  />
                )}
              />

              <Controller
                control={control}
                name="observerIds"
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    className={styles.full}
                    label="Observadores"
                    options={personOptions}
                  />
                )}
              />
            </div>
          )}

          {stepIndex === 2 && (
            <div className={styles.grid}>
              <Controller
                control={control}
                name="locationDescription"
                rules={{ required: "El detalle de localizacion es requerido" }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className={styles.full}
                    label="Detalle de localizacion"
                    placeholder="Nivel, eje, zona o referencia en obra"
                  />
                )}
              />
              {errors.locationDescription && (
                <p className={styles.error}>
                  {errors.locationDescription.message}
                </p>
              )}

              <div className={`${styles.mapField} ${styles.full}`}>
                <span>Ubicacion en mapa</span>
                <MapView
                  center={selectedCoordinates}
                  height="12rem"
                  markerCoordinates={selectedCoordinates}
                  onCoordinatesSelect={selectCoordinates}
                  zoom={12}
                />
              </div>

              <Controller
                control={control}
                name="latitude"
                rules={{
                  required: "La latitud es requerida",
                  validate: (value) =>
                    Number.isFinite(Number(value)) || "Latitud invalida",
                }}
                render={({ field }) => <Input {...field} label="Latitud" />}
              />
              {errors.latitude && (
                <p className={styles.error}>{errors.latitude.message}</p>
              )}

              <Controller
                control={control}
                name="longitude"
                rules={{
                  required: "La longitud es requerida",
                  validate: (value) =>
                    Number.isFinite(Number(value)) || "Longitud invalida",
                }}
                render={({ field }) => <Input {...field} label="Longitud" />}
              />
              {errors.longitude && (
                <p className={styles.error}>{errors.longitude.message}</p>
              )}

              <label className={`${styles.fileField} ${styles.full}`}>
                <span>Archivos adjuntos</span>
                <input
                  accept="image/*"
                  multiple
                  type="file"
                  {...register("attachments", {
                    validate: validateImageAttachments,
                  })}
                />
              </label>
              {errors.attachments && (
                <p className={styles.error}>{errors.attachments.message}</p>
              )}

              {attachmentPreviews.length > 0 && (
                <div className={`${styles.previewList} ${styles.full}`}>
                  {attachmentPreviews.map((preview) => (
                    <figure className={styles.preview} key={preview.url}>
                      <img alt={preview.name} src={preview.url} />
                      <figcaption>{preview.name}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          )}

          <footer className={styles.actions}>
            <button
              className={styles.secondaryButton}
              disabled={stepIndex === 0}
              type="button"
              onClick={() =>
                setStepIndex((currentStep) => Math.max(currentStep - 1, 0))
              }
            >
              Anterior
            </button>

            {!isLastStep ? (
              <Button type="button" onClick={nextStep}>
                Siguiente
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit(onSubmit)}>
                Guardar incidencia
              </Button>
            )}
          </footer>
        </form>
      </section>
    </div>
  );
};
