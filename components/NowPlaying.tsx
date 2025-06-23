"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaLastfm } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { LastFmResponse, TTrack } from "@/types/lastfm";

export default function NowPlaying() {
  const [data, setData] = useState<LastFmResponse | null>(null);
  const [recentTracksOpen, setRecentTracksOpen] = useState(false);

  const fetchTrack = async () => {
    const res = await fetch("/api/lastfm");
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-end gap-3 z-50">
        {data.nowPlaying && !recentTracksOpen && (
          <div className="card bg-base-100/90 flex flex-col justify-center px-4 py-2 rounded-xl shadow-md max-w-[250px]">
            <span className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
              Now playing:
            </span>
            <span className="text-sm text-gray-500 truncate">
              {data.nowPlaying.artist}
            </span>
            <span className="font-medium truncate">{data.nowPlaying.name}</span>
          </div>
        )}

        <button
          onClick={() => setRecentTracksOpen((prev) => !prev)}
          className="card bg-base-100 w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          {data.nowPlaying ? (
            recentTracksOpen ? (
              <MdClose size="1.5rem" />
            ) : (
              <Image
                src="/images/common/audio.gif"
                alt="Audio playing"
                width={60}
                height={60}
                unoptimized
                className="object-cover w-full h-full rounded-full"
              />
            )
          ) : (
            <FaLastfm size="1.5rem" />
          )}
        </button>
      </div>

      {recentTracksOpen && (
        <div className="card bg-base-100 rounded-xl shadow-2xl max-w-xs text-sm w-[500px] fixed right-23 bottom-5 z-100">
          {data.nowPlaying && (
            <div>
              <p className="pt-2 px-4 text-xs opacity-60 tracking-wide">
                Now playing:
              </p>
              <a
                href={data.nowPlaying.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2"
              >
                <Image
                  src={data.nowPlaying.image}
                  alt="Album art"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <div className="opacity-60">{data.nowPlaying.artist}</div>
                  <div className="font-semibold">{data.nowPlaying.name}</div>
                </div>
              </a>
            </div>
          )}

          <ul className="list rounded-box m-0 p-0">
            <li className="pt-2 px-4 text-xs opacity-60 tracking-wide">
              Последние треки:
            </li>
            {data.history.map((track: TTrack, index: number) => (
              <li key={index} className="list-row">
                <div>
                  <Image
                    src={track.image}
                    alt="Album art"
                    width={40}
                    height={40}
                    className="size-10 rounded-box"
                  />
                </div>
                <div>
                  <div className="font-semibold opacity-60 ">
                    {track.artist}
                  </div>
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold flex items-center"
                  >
                    {track.name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
