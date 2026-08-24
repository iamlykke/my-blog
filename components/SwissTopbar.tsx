import Link from "next/link";

export function SwissTopbar({ page }: { page: "archive" | "map" }) {
  return (
    <div className="swiss-topbar">
      <div>
        <span className="dot" />
        {page === "archive" ? "Archive" : "Map"} · active
      </div>
      <div>
        <a href="https://www.last.fm/user/iamlykke" target="_blank" rel="noopener noreferrer">Last.fm ↗</a>
        <a href="https://roundnsquare.club/lykke" target="_blank" rel="noopener noreferrer">Vinyl ↗</a>
        {page === "archive" ? (
          <Link href="/map">Map ↗</Link>
        ) : (
          <Link href="/">Archive ↗</Link>
        )}
      </div>
    </div>
  );
}
