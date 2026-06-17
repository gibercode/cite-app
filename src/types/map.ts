import type { CSSProperties } from "react";

export type MapCoordinates = [number, number];

export type MapMarker = {
  id: string;
  title: string;
  coordinates: MapCoordinates;
};

export type MapProps = {
  center?: MapCoordinates;
  height?: CSSProperties["height"];
  markerCoordinates?: MapCoordinates;
  markers?: MapMarker[];
  onCoordinatesSelect?: (coordinates: MapCoordinates) => void;
  onMarkerClick?: (marker: MapMarker) => void;
  zoom?: number;
};
