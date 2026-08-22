import { Metadata } from "next";
import { getAllConcerts } from "@/lib/concerts";
import { MapLoader } from "@/components/MapLoader";
import { SwissTopbar } from "@/components/SwissTopbar";
import "../swiss.css";

export const metadata: Metadata = {
  title: "Map",
};

export default function MapPage() {
  const concerts = getAllConcerts();

  return (
    <div className="page-swiss page-map">
      <SwissTopbar page="map" />
      <div className="map-full">
        <MapLoader concerts={concerts} />
      </div>
    </div>
  );
}
