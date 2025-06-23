import { LastFmApiResponse } from '@/types/lastfm';
import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.LASTFM_USERNAME;
  const apiKey = process.env.LASTFM_API_KEY;

  const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=6`);
  const data: LastFmApiResponse = await res.json();

  const tracks = data.recenttracks.track;

  const nowPlaying = tracks.find((track) => track['@attr']?.nowplaying === 'true');
  const history = tracks.filter((track) => !track['@attr']?.nowplaying).slice(0, 5);

  return NextResponse.json({
    nowPlaying: nowPlaying
      ? {
          artist: nowPlaying.artist['#text'],
          name: nowPlaying.name,
          image: nowPlaying.image?.[2]?.['#text'],
          url: nowPlaying.url,
        }
      : null,
    history: history.map((t) => ({
      artist: t.artist['#text'],
      name: t.name,
      image: t.image?.[1]?.['#text'],
      url: t.url,
      date: t.date?.uts,
    })),
  });
}
