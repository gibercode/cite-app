import type { Incident, Person, SelectOption } from "@/types";

export const getUniquePeople = (incidents: Incident[]) => {
  const peopleMap = new Map<string, Person>();

  incidents.forEach((incident) => {
    [incident.owner, ...incident.assignees, ...incident.observers].forEach(
      (person) => {
        if (person) peopleMap.set(person.id, person);
      },
    );
  });

  return Array.from(peopleMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "es"),
  );
};

export const getPersonOptions = (people: Person[]): SelectOption[] =>
  people.map((person) => ({ value: person.id, label: person.name }));
