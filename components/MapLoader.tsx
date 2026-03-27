"use client";

import dynamic from "next/dynamic";
import { Concert } from "@/types";

const ConcertMap = dynamic(
  () => import("@/components/ConcertMap").then((m) => m.ConcertMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-base-200 rounded-lg animate-pulse" />
    ),
  }
);

export function MapLoader({ concerts }: { concerts: Concert[] }) {
  return <ConcertMap concerts={concerts} />;
}
