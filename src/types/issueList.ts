import type { Incident } from "./incident";

export type IssueListProps = {
  incidents: Incident[];
  showPaginationInfo?: boolean;
};
