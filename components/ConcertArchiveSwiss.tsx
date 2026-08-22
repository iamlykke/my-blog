"use client";

import { useState, useMemo, useEffect } from "react";
import { Concert } from "@/types";
import { toIso } from "@/lib/concerts";
import { getSetlist, getNote, Setlist } from "@/lib/setlists";
import { SwissTopbar } from "@/components/SwissTopbar";

const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function splitArtists(artistStr: string): string[] {
  return artistStr.split(',').map(s => s.trim());
}

function isFestival(concert: Concert): boolean {
  return /festival/i.test(concert.artist) || /festival/i.test(concert.venue ?? '');
}

function getCity(location: string): string {
  return location.split(',')[0].trim();
}

function getCountry(location: string): string {
  const parts = location.split(',');
  return parts[parts.length - 1].trim();
}

interface Stats {
  total: number;
  upcoming: number;
  cities: number;
  countries: number;
}

function computeStats(concerts: Concert[]): Stats {
  const today = new Date().toISOString().split('T')[0];
  const past = concerts.filter(c => toIso(c.date) < today);
  const upcoming = concerts.filter(c => toIso(c.date) >= today);
  const cities = new Set(past.map(c => getCity(c.location)));
  const countries = new Set(past.map(c => getCountry(c.location)));
  return {
    total: past.length,
    upcoming: upcoming.length,
    cities: cities.size,
    countries: countries.size,
  };
}

function groupByYear(concerts: Concert[], today: string): {
  upcoming: Concert[];
  pastByYear: Record<number, Concert[]>;
  yearsDesc: number[];
} {
  const upcoming: Concert[] = [];
  const pastByYear: Record<number, Concert[]> = {};

  for (const c of concerts) {
    if (toIso(c.date) >= today) {
      upcoming.push(c);
    } else {
      const year = parseInt(c.date.slice(6), 10);
      if (!pastByYear[year]) pastByYear[year] = [];
      pastByYear[year].push(c);
    }
  }

  upcoming.sort((a, b) => toIso(a.date).localeCompare(toIso(b.date)));
  const yearsDesc = Object.keys(pastByYear).map(Number).sort((a, b) => b - a);

  return { upcoming, pastByYear, yearsDesc };
}

// ============================================================
// Sub-components
// ============================================================

function SwissMast({ stats, yearsDesc }: { stats: Stats; yearsDesc: number[] }) {
  const minYear = yearsDesc[yearsDesc.length - 1] ?? new Date().getFullYear();
  const maxYear = new Date().getFullYear();
  return (
    <section className="swiss-mast">
      <h1>Concerts<br /><span className="accent">/ {minYear}—{maxYear}</span></h1>
      <div className="swiss-mast-sub">
        <div>
          <span className="k">System</span>
          Live-music log
        </div>
        <div>
          <span className="k">Custodian</span>
          Lykke · Serbia
        </div>
        <div>
          <span className="k">Coverage</span>
          {stats.countries} countries, {stats.cities} cities
        </div>
        <div>
          <span className="k">Entries</span>
          {stats.total} attended, {stats.upcoming} upcoming
        </div>
      </div>
    </section>
  );
}

function SwissStats({ stats }: { stats: Stats }) {
  return (
    <section className="swiss-stats">
      <div className="swiss-stat">
        <div className="swiss-stat-num"><span className="accent">{stats.total}</span></div>
        <div className="swiss-stat-label">Shows attended</div>
      </div>
      <div className="swiss-stat">
        <div className="swiss-stat-num">{stats.cities}</div>
        <div className="swiss-stat-label">Cities</div>
      </div>
      <div className="swiss-stat">
        <div className="swiss-stat-num">{stats.countries}</div>
        <div className="swiss-stat-label">Countries</div>
      </div>
      <div className="swiss-stat">
        <div className="swiss-stat-num">{stats.upcoming}</div>
        <div className="swiss-stat-label">Upcoming</div>
      </div>
    </section>
  );
}

function SwissControls({
  query, setQuery,
  city, setCity,
  artist, setArtist,
  cities, artists,
}: {
  query: string; setQuery: (v: string) => void;
  city: string; setCity: (v: string) => void;
  artist: string; setArtist: (v: string) => void;
  cities: string[]; artists: string[];
}) {
  return (
    <div className="swiss-controls">
      <div className="swiss-search">
        <input
          type="text"
          placeholder="Search artist, venue, city"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <select className="swiss-select" value={city} onChange={e => setCity(e.target.value)}>
        <option value="">All cities</option>
        {cities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="swiss-select" value={artist} onChange={e => setArtist(e.target.value)}>
        <option value="">All artists</option>
        {artists.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}

type ActiveView = 'upcoming' | 'all' | number;

function SwissNav({
  active, onSelect,
  yearsDesc, pastByYear, upcomingCount,
}: {
  active: ActiveView; onSelect: (v: ActiveView) => void;
  yearsDesc: number[]; pastByYear: Record<number, Concert[]>; upcomingCount: number;
}) {
  return (
    <aside className="swiss-nav">
      <div className="swiss-nav-label">Index</div>
      <button
        className={`swiss-year-btn ${active === 'upcoming' ? 'active' : ''}`}
        onClick={() => onSelect('upcoming')}
      >
        <span className="swiss-year-num" style={{ fontSize: 20, fontWeight: 600 }}>Upcoming</span>
        <span className="swiss-year-count">{upcomingCount}</span>
      </button>
      <button
        className={`swiss-year-btn ${active === 'all' ? 'active' : ''}`}
        onClick={() => onSelect('all')}
      >
        <span className="swiss-year-num" style={{ fontSize: 20, fontWeight: 600 }}>All past</span>
        <span className="swiss-year-count">{Object.values(pastByYear).flat().length}</span>
      </button>
      {yearsDesc.map(y => (
        <button
          key={y}
          className={`swiss-year-btn ${active === y ? 'active' : ''}`}
          onClick={() => onSelect(y)}
        >
          <span className="swiss-year-num">{y}</span>
          <span className="swiss-year-count">{(pastByYear[y] ?? []).length}</span>
        </button>
      ))}
    </aside>
  );
}

function SwissRow({
  concert, expanded, onToggle, today,
}: {
  concert: Concert; expanded: boolean; onToggle: () => void; today: string;
}) {
  const isFut = toIso(concert.date) >= today;
  const artists = splitArtists(concert.artist);
  const mainArtist = artists[0];
  const support = artists.slice(1).join(', ');
  const city = getCity(concert.location);
  const country = getCountry(concert.location);
  const isFest = isFestival(concert);

  const [d, mo] = concert.date.split('.');
  const monthStr = MONTHS_EN[parseInt(mo, 10) - 1];
  const yr = `'${concert.date.slice(8)}`;

  const setlist: Setlist | undefined = getSetlist(concert.date, concert.artist);
  const note = getNote(concert.date, concert.artist);
  const hasInline = !!setlist;
  const canExpand = !isFut && hasInline;

  return (
    <>
      <div
        className={[
          'swiss-row',
          isFut ? 'future' : '',
          expanded ? 'expanded' : '',
          canExpand ? 'clickable' : '',
        ].filter(Boolean).join(' ')}
        onClick={canExpand ? onToggle : undefined}
      >
        <div className="swiss-row-date">
          <span className="day">{d}</span>
          <span className="mon">{monthStr}</span>
          <span className="yr">{yr}</span>
        </div>

        <div className="swiss-row-main">
          <div className="swiss-row-artist">
            {mainArtist}
            {support && <span className="support"> &nbsp;+ {support}</span>}
          </div>
          <div className="swiss-row-meta">
            {concert.venue && <><span className="venue">{concert.venue}</span><span className="sep">/</span></>}
            <span className="city">{city}</span>
            <span className="country">— {country}</span>
          </div>
        </div>

        <div className="swiss-row-right" onClick={e => e.stopPropagation()}>
          {isFut && <span className="swiss-tag future">Upcoming</span>}
          {!isFut && isFest && <span className="swiss-tag festival">Festival</span>}
          {!isFut && (
            hasInline ? (
              <button
                className={`swiss-setlist-btn has ${expanded ? 'expanded' : ''}`}
                onClick={e => { e.stopPropagation(); onToggle(); }}
              >
                Setlist
              </button>
            ) : concert.setlistUrl ? (
              <a
                className="swiss-setlist-btn link"
                href={concert.setlistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Setlist.fm
              </a>
            ) : null
          )}
        </div>
      </div>

      {expanded && !isFut && (
        <div className="swiss-expanded">
          <div />
          <div className="swiss-expanded-body">
            <div>
              <div className="swiss-expanded-label">Setlist</div>
              <ol className="swiss-setlist-ol">
                {setlist!.songs.map((s, i) => <li key={i}>{s}</li>)}
                {setlist!.encore.map((s, i) => <li key={`e${i}`} className="encore">{s}</li>)}
              </ol>
            </div>
            <div>
              <div className="swiss-expanded-label">Note</div>
              {note || setlist?.note ? (
                <div className="swiss-note"><p>{note || setlist?.note}</p></div>
              ) : (
                <div className="swiss-note-empty">— no note —</div>
              )}
              <div className="swiss-expanded-location" style={{ marginTop: 16 }}>
                <div className="swiss-expanded-label">Location</div>
                {concert.venue && <div>{concert.venue}</div>}
                <div className="swiss-expanded-location-country">{city} · {country}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SwissSection({
  title, num, meta, concerts, expanded, toggle, today,
}: {
  title: string;
  num: number | string;
  meta: React.ReactNode;
  concerts: Concert[];
  expanded: string | null;
  toggle: (id: string) => void;
  today: string;
}) {
  return (
    <div style={{ marginBottom: 64 }}>
      <div className="swiss-section-head">
        <div className="swiss-section-head-left">
          <div className="swiss-section-num">{num}</div>
          {title && <div className="swiss-section-label">{title}</div>}
        </div>
        <div className="swiss-section-meta">{meta}</div>
      </div>
      {concerts.map((c, i) => {
        const id = `${c.date}|${c.artist}|${i}`;
        return (
          <SwissRow
            key={id}
            concert={c}
            expanded={expanded === id}
            onToggle={() => toggle(id)}
            today={today}
          />
        );
      })}
    </div>
  );
}

// ============================================================
// Main component
// ============================================================

export function ConcertArchiveSwiss({ concerts }: { concerts: Concert[] }) {
  const today = new Date().toISOString().split('T')[0];
  const stats = useMemo(() => computeStats(concerts), [concerts]);
  const { upcoming, pastByYear, yearsDesc } = useMemo(
    () => groupByYear(concerts, today),
    [concerts, today]
  );

  const allSorted = useMemo(
    () => [...concerts].sort((a, b) => toIso(b.date).localeCompare(toIso(a.date))),
    [concerts]
  );

  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [artist, setArtist] = useState('');
  const [active, setActive] = useState<ActiveView>('upcoming');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('swiss.active');
    if (stored) {
      if (stored === 'upcoming' || stored === 'all') setActive(stored);
      else {
        const n = Number(stored);
        if (!isNaN(n)) setActive(n);
      }
    }
  }, []);

  const selectActive = (v: ActiveView) => {
    localStorage.setItem('swiss.active', String(v));
    setActive(v);
  };

  const toggleExpanded = (id: string) =>
    setExpanded(cur => (cur === id ? null : id));

  const cities = useMemo(
    () => [...new Set(allSorted.map(c => getCity(c.location)))].sort(),
    [allSorted]
  );
  const artists = useMemo(
    () => [...new Set(allSorted.flatMap(c => splitArtists(c.artist)))].sort(),
    [allSorted]
  );

  const q = query.trim().toLowerCase();
  const isFiltering = !!(q || city || artist);

  const filtered = useMemo(() => {
    if (!isFiltering) return [];
    return allSorted.filter(c => {
      const mq = !q || c.artist.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (c.venue ?? '').toLowerCase().includes(q);
      const mc = !city || getCity(c.location) === city;
      const ma = !artist || splitArtists(c.artist).includes(artist);
      return mq && mc && ma;
    });
  }, [q, city, artist, allSorted, isFiltering]);

  const totalPast = Object.values(pastByYear).flat().length;

  return (
    <div className="page-swiss grid">
      <SwissTopbar page="archive" />
      <SwissMast stats={stats} yearsDesc={yearsDesc} />
      <SwissStats stats={stats} />
      <SwissControls
        query={query} setQuery={setQuery}
        city={city} setCity={setCity}
        artist={artist} setArtist={setArtist}
        cities={cities} artists={artists}
      />

      <div className="swiss-main">
        <SwissNav
          active={active}
          onSelect={selectActive}
          yearsDesc={yearsDesc}
          pastByYear={pastByYear}
          upcomingCount={upcoming.length}
        />

        <div className="swiss-list-wrap">
          {isFiltering && (
            <SwissSection
              title="Results"
              num={filtered.length}
              meta={<>{q ? `"${q}"` : '—'}{city && <><br />in {city}</>}{artist && <><br />by {artist}</>}</>}
              concerts={filtered}
              expanded={expanded}
              toggle={toggleExpanded}
              today={today}
            />
          )}

          {!isFiltering && active === 'upcoming' && (
            <SwissSection
              title="Upcoming"
              num={upcoming.length}
              meta={<>Next show<br />{upcoming[0]?.date ?? '—'}</>}
              concerts={upcoming}
              expanded={expanded}
              toggle={toggleExpanded}
              today={today}
            />
          )}

          {!isFiltering && active === 'all' && yearsDesc.map(y => (
            <SwissSection
              key={y}
              title=""
              num={y}
              meta={<>{(pastByYear[y] ?? []).length} concerts archived</>}
              concerts={pastByYear[y] ?? []}
              expanded={expanded}
              toggle={toggleExpanded}
              today={today}
            />
          ))}

          {!isFiltering && typeof active === 'number' && (
            <SwissSection
              title=""
              num={active}
              meta={<>{(pastByYear[active] ?? []).length} concerts archived</>}
              concerts={pastByYear[active] ?? []}
              expanded={expanded}
              toggle={toggleExpanded}
              today={today}
            />
          )}
        </div>
      </div>

      <footer className="swiss-footer">
        <div>Lykke · Concert Archive</div>

        <div className="right">{totalPast}/{totalPast + upcoming.length} logged</div>
      </footer>
    </div>
  );
}
