import type {
  CreateIncidentInput,
  Incident,
  IncidentFormValues,
  Person,
} from "@/types";

type BuildCreateIncidentInputParams = {
  incidents: Incident[];
  people: Person[];
  values: IncidentFormValues;
};

const getUniqueTags = (incidents: Incident[]) => {
  const tagMap = new Map<string, Incident["tags"][number]>();

  incidents.forEach((incident) => {
    incident.tags.forEach((tag) => tagMap.set(tag.id, tag));
  });

  return Array.from(tagMap.values());
};

const getMediaFromAttachments = (attachments?: FileList) => {
  return Array.from(attachments ?? [])
    .filter((file) => file.type.startsWith("image/"))
    .map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: "image",
      format: file.name.split(".").pop() ?? "",
      size: file.size,
      status: "uploaded",
      url: URL.createObjectURL(file),
    }));
};

export const buildCreateIncidentInput = ({
  incidents,
  people,
  values,
}: BuildCreateIncidentInputParams): CreateIncidentInput => {
  const category =
    incidents.find((incident) => incident.type.id === values.categoryId)
      ?.type ?? incidents[0].type;
  const tags = getUniqueTags(incidents).filter((tag) =>
    values.tagIds.includes(tag.id),
  );
  const assignees = people.filter((person) =>
    values.assigneeIds.includes(person.id),
  );
  const observers = people.filter((person) =>
    values.observerIds.includes(person.id),
  );

  return {
    title: values.title,
    description: values.description,
    dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
    priority: values.priority,
    type: category,
    tags,
    assignees,
    observers,
    locationDescription: values.locationDescription,
    coordinates: {
      lat: Number(values.latitude),
      lng: Number(values.longitude),
    },
    media: getMediaFromAttachments(values.attachments),
  };
};
