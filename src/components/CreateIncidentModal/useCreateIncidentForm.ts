import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CARACAS_COORDINATES } from "@/constants";
import type { IncidentFormValues } from "@/types";

export const getTodayInputValue = () => new Date().toISOString().slice(0, 10);

export const validateDueDate = (value: string) => {
  if (!value) return "La fecha de vencimiento es requerida";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Fecha invalida";
  if (value < getTodayInputValue()) {
    return "La fecha de vencimiento no puede estar en el pasado";
  }
  return true;
};

export const validateImageAttachments = (attachments?: FileList) => {
  const files = Array.from(attachments ?? []);
  const hasInvalidFile = files.some((file) => !file.type.startsWith("image/"));
  return hasInvalidFile ? "Solo se permiten archivos de imagen" : true;
};

type UseCreateIncidentFormParams = {
  defaultCategoryId: string;
};

export const useCreateIncidentForm = ({
  defaultCategoryId,
}: UseCreateIncidentFormParams) => {
  const form = useForm<IncidentFormValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      categoryId: defaultCategoryId,
      priority: "medium",
      tagIds: [],
      assigneeIds: [],
      observerIds: [],
      locationDescription: "",
      latitude: String(CARACAS_COORDINATES[1]),
      longitude: String(CARACAS_COORDINATES[0]),
    },
  });

  const [latitude, longitude] = useWatch({
    control: form.control,
    name: ["latitude", "longitude"],
  });
  const attachments = useWatch({
    control: form.control,
    name: "attachments",
  });

  const selectedCoordinates = useMemo(() => {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return CARACAS_COORDINATES;
    }

    return [lng, lat] satisfies [number, number];
  }, [latitude, longitude]);

  const selectCoordinates = ([lng, lat]: [number, number]) => {
    form.setValue("latitude", lat.toFixed(6), {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("longitude", lng.toFixed(6), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const attachmentPreviews = useMemo(() => {
    return Array.from(attachments ?? [])
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
  }, [attachments]);

  useEffect(() => {
    return () => {
      attachmentPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [attachmentPreviews]);

  return {
    ...form,
    attachmentPreviews,
    selectedCoordinates,
    selectCoordinates,
  };
};
