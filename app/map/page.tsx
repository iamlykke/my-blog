import { Metadata } from "next";
import { getAllConcerts } from "@/lib/concerts";
import { MapLoader } from "@/components/MapLoader";

export const metadata: Metadata = {
  title: "Концертная карта",
};

export default function MapPage() {
  const concerts = getAllConcerts();

  return (
    <div className="h-[calc(100dvh-240px)] md:h-[1000px]">
      <MapLoader concerts={concerts} />
    </div>
  );
}
