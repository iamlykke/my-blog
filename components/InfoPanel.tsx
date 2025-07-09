"use client";

import { useEffect, useState } from "react";
import { LastFmResponse } from "@/types/lastfm";
import NowPlayingCard from "./NowPlayingCard";
import TrackItem from "./TrackItem";
import Slider from "./Slider";

export const InfoPanel = () => {
  const [data, setData] = useState<LastFmResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const res = await fetch("/api/lastfm");
      const data = await res.json();
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  const nowPlaying = data?.nowPlaying;
  const recentTracks = data?.history?.slice(0, 5) || [];

  return (
    <aside className="w-100 h-screen bg-base-200 p-4 flex-col justify-between sticky top-0 hidden lg:flex">
      <Slider />
      <div className="mt-auto">
        <h3 className="text-sm font-semibold uppercase text-base-content mb-3">
          Recently Played
        </h3>

        <div className="flex flex-col gap-2">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-14 w-full rounded-lg" />
              ))
            : recentTracks.map((track, i) => (
                <TrackItem key={`${track.name}-${i}`} track={track} />
              ))}
        </div>
      </div>
      {loading ? (
        <div className="skeleton h-20 w-full rounded-xl mt-6" />
      ) : nowPlaying ? (
        <NowPlayingCard track={nowPlaying} />
      ) : null}
    </aside>
  );
};
