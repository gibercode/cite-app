import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapCoordinates, MapMarker } from "@/types";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type MapProps = {
  center?: MapCoordinates;
  height?: CSSProperties["height"];
  markerCoordinates?: MapCoordinates;
  markers?: MapMarker[];
  onCoordinatesSelect?: (coordinates: MapCoordinates) => void;
  zoom?: number;
};

const defaultCoordinates: MapCoordinates = [-66.9036, 10.4806];

export const Map = ({
  center = defaultCoordinates,
  height = "500px",
  markerCoordinates = center,
  markers,
  onCoordinatesSelect,
  zoom = 11,
}: MapProps) => {
  const [centerLng, centerLat] = center;
  const [markerLng, markerLat] = markerCoordinates;
  const mapMarkers = useMemo(
    () =>
      markers ?? [
        {
          id: "selected-location",
          title: "Ubicacion seleccionada",
          coordinates: [markerLng, markerLat] satisfies MapCoordinates,
        },
      ],
    [markerLat, markerLng, markers],
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);
  const initialCenterRef = useRef(center);
  const initialMarkersRef = useRef(mapMarkers);
  const initialZoomRef = useRef(zoom);
  const onCoordinatesSelectRef = useRef(onCoordinatesSelect);

  useEffect(() => {
    onCoordinatesSelectRef.current = onCoordinatesSelect;
  }, [onCoordinatesSelect]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialCenterRef.current,
      zoom: initialZoomRef.current,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    markerRefs.current = initialMarkersRef.current.map((marker) =>
      new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 24 }).setText(marker.title))
        .addTo(mapRef.current!),
    );

    const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
      onCoordinatesSelectRef.current?.([event.lngLat.lng, event.lngLat.lat]);
    };

    mapRef.current.on("click", handleMapClick);

    return () => {
      mapRef.current?.off("click", handleMapClick);
      markerRefs.current.forEach((marker) => marker.remove());
      markerRefs.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    mapRef.current?.setCenter([centerLng, centerLat]);
    mapRef.current?.setZoom(zoom);
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    if (!mapRef.current) return;

    markerRefs.current.forEach((marker) => marker.remove());
    markerRefs.current = mapMarkers.map((marker) =>
      new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 24 }).setText(marker.title))
        .addTo(mapRef.current!),
    );
  }, [mapMarkers]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height,
      }}
    />
  );
};
