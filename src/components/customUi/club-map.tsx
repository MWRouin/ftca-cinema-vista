import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** OpenStreetMap's standard tiles (no key; light use with the credit line is
 *  allowed). In dark mode a CSS filter darkens them (.club-map in index.css). */
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface ClubMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  /** Accessible name of the map region. */
  label: string;
  /** Text of the button that brings the view back to the pin. */
  recenterLabel: string;
  /** Size of the map box. */
  className?: string;
}

/**
 * An interactive map with one pin. Leaflet touches `window` when it loads, so
 * it is imported in an effect; the server and first client render are an empty
 * box of the same size. Once the visitor pans the pin out of view or zooms far
 * out, a button appears that flies back to it.
 */
export function ClubMap({ lat, lng, zoom = 16, label, recenterLabel, className }: ClubMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [away, setAway] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;
      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([lat, lng], zoom);
      L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map);
      // Drop Leaflet's own "Leaflet" link (optional under its licence); the
      // OpenStreetMap credit stays, as the tile usage policy requires.
      map.attributionControl.setPrefix(false);
      // A drawn pin (no image files): green with a wheat centre.
      const pin = L.divIcon({
        className: "",
        html: '<span class="club-map-pin"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 34], // the tip of the rotated teardrop
      });
      L.marker([lat, lng], { icon: pin, keyboard: false }).addTo(map);
      // "Away": the pin is outside the view, or the view is 3+ levels zoomed out.
      map.on("moveend", () => {
        setAway(!map.getBounds().contains([lat, lng]) || map.getZoom() <= zoom - 3);
      });
      mapRef.current = map;
    });
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom]);

  return (
    <div className={cn("relative", className)}>
      <div ref={containerRef} role="region" aria-label={label} className="club-map absolute inset-0 z-0" />
      {away && (
        <Button
          type="button"
          size="sm"
          onClick={() => mapRef.current?.flyTo([lat, lng], zoom)}
          className="absolute bottom-8 left-1/2 z-[500] -translate-x-1/2 shadow-md"
        >
          <LocateFixed aria-hidden />
          {recenterLabel}
        </Button>
      )}
    </div>
  );
}
