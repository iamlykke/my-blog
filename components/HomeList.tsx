"use client";

import { useState, useMemo } from "react";
import { Concert } from "@/types";
import { formatConcertDate } from "@/lib/concerts";

function ConcertRow({ concert }: { concert: Concert }) {
  const locationStr = concert.venue
    ? `${concert.venue}, ${concert.location}`
    : concert.location;

  return (
    <li className="text-base-content/70">
      {formatConcertDate(concert.date)} — <span>{concert.artist}</span>
      <span className="text-sm text-base-content/50"> · {locationStr}</span>
    </li>
  );
}

interface Props {
  upcoming: Concert[];
  byYear: Record<number, Concert[]>;
  years: number[];
}

export function HomeList({ upcoming, byYear, years }: Props) {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");

  const allConcerts = useMemo(
    () => [...upcoming, ...years.flatMap((y) => byYear[y])],
    [upcoming, byYear, years]
  );

  const cities = useMemo(() => {
    const set = new Set(allConcerts.map((c) => c.location.split(",")[0].trim()));
    return Array.from(set).sort();
  }, [allConcerts]);

  const artists = useMemo(() => {
    const set = new Set(allConcerts.map((c) => c.artist));
    return Array.from(set).sort();
  }, [allConcerts]);

  const isFiltering = query.trim() || cityFilter || artistFilter;

  const filtered = useMemo(() => {
    if (!isFiltering) return [];
    const q = query.toLowerCase().trim();
    return allConcerts.filter((c) => {
      const matchesQuery =
        !q ||
        c.artist.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (c.venue ?? "").toLowerCase().includes(q);
      const matchesCity =
        !cityFilter || c.location.split(",")[0].trim() === cityFilter;
      const matchesArtist = !artistFilter || c.artist === artistFilter;
      return matchesQuery && matchesCity && matchesArtist;
    });
  }, [query, cityFilter, artistFilter, allConcerts, isFiltering]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-4">
        {/* Controls */}
        <div className="join w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="input input-bordered input-sm join-item flex-1"
          />
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="select select-bordered select-sm join-item w-26 sm:w-40"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            className="select select-bordered select-sm join-item w-26 sm:w-40"
          >
            <option value="">All artists</option>
            {artists.map((artist) => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
        </div>

        {/* Filtered results */}
        {isFiltering && (
          <div className="bg-base-200 rounded-xl px-4 py-3">
            {filtered.length === 0 ? (
              <p className="text-base-content/40 text-sm">Nothing found</p>
            ) : (
              <ul className="space-y-1">
                {filtered.map((c) => (
                  <ConcertRow key={c.date + c.artist} concert={c} />
                ))}
              </ul>
            )}
          </div>
        )}

      {/* Normal grouped list */}
      {!isFiltering && (
        <>
          {upcoming.length > 0 && (
            <div className="bg-base-200 rounded-2xl px-4 py-3">
              <h2 className="text-lg font-semibold mb-2">Upcoming</h2>
              <ul className="space-y-1">
                {upcoming.map((c) => (
                  <ConcertRow key={c.date + c.artist} concert={c} />
                ))}
              </ul>
            </div>
          )}

          {years.map((year) => {
            const isCurrentYear = year === currentYear;
            const list = (
              <ul className="space-y-1">
                {byYear[year].map((c) => (
                  <ConcertRow key={c.date + c.artist} concert={c} />
                ))}
              </ul>
            );

            if (isCurrentYear) {
              return (
                <div key={year} className="bg-base-200 rounded-2xl px-4 py-3">
                  <div className="flex items-baseline gap-2 mb-2 justify-between">
                    <h3 className="text-lg font-semibold">{year}</h3>
                    <span className="text-sm font-normal text-base-content/40">
                      {byYear[year].length} concerts so far
                    </span>
                  </div>
                  {list}
                </div>
              );
            }

            return (
              <div key={year} className="collapse collapse-arrow bg-base-200 rounded-2xl">
                <input type="checkbox" />
                <div className="collapse-title flex items-center gap-3 py-3 font-semibold text-lg justify-between after:!top-1/2 after:!-translate-y-1/4">
                  {year}
                  <span className="text-sm font-normal text-base-content/40">
                    {byYear[year].length} concerts
                  </span>
                </div>
                <div className="collapse-content">{list}</div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
