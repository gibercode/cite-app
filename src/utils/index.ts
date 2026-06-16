export const formatDate = (date: string | null) => {
  if (!date) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export { getPersonOptions, getUniquePeople } from "./people";
