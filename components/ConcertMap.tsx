"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Concert } from "@/types";
import { CITY_COORDS } from "@/lib/cityCoords";
import { toIso } from "@/lib/concerts";
import "leaflet/dist/leaflet.css";

function pluralize(n: number): string {
  return n === 1 ? "concert" : "concerts";
}

interface CityData {
  city: string;
  country: string;
  coords: [number, number];
  concerts: Concert[];
}

function buildCityData(concerts: Concert[]): CityData[] {
  const map = new Map<string, CityData>();

  for (const concert of concerts) {
    const [city, ...rest] = concert.location.split(",");
    const cityKey = city.trim();
    const coords = CITY_COORDS[cityKey];
    if (!coords) continue;

    if (!map.has(cityKey)) {
      map.set(cityKey, {
        city: cityKey,
        country: rest.join(",").trim(),
        coords,
        concerts: [],
      });
    }
    map.get(cityKey)!.concerts.push(concert);
  }

  return Array.from(map.values());
}

export function ConcertMap({ concerts }: { concerts: Concert[] }) {
  const today = new Date().toISOString().split("T")[0];
  const past = concerts.filter((c) => toIso(c.date) < today);
  const cities = buildCityData(past);

  // Fix leaflet default icon issue in Next.js
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={[48, 15]}
      zoom={4}
      className="w-full h-full"
      scrollWheelZoom
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <CircleMarker
          key={city.city}
          center={city.coords}
          radius={6 + Math.min(city.concerts.length * 1.5, 14)}
          pathOptions={{
            fillColor: "#570df8",
            color: "#570df8",
            fillOpacity: 0.7,
            weight: 1.5,
          }}
        >
          <Popup>
            <div className="w-[300px]">
              <p className="font-bold text-base mb-1">
                {city.city}
                <span className="font-normal text-gray-500 text-sm"> · {city.country}</span>
                <span className="font-normal text-gray-500 text-sm"> · {city.concerts.length} {pluralize(city.concerts.length)}</span>
              </p>
              <ul className="text-sm space-y-0.5 mt-4">
                {city.concerts
                  .sort((a, b) => toIso(b.date).localeCompare(toIso(a.date)))
                  .map((c) => (
                    <li key={c.date + c.artist} className="text-gray-700 grid grid-cols-[auto_1fr] gap-4">
                      <span className="text-gray-400 text-s">{c.date.slice(0, 5)}.{c.date.slice(6)}</span>
                      <span className="text-s">{c.artist}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
