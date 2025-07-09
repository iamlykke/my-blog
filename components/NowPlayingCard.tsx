import Image from "next/image";
import { FaLastfm } from "react-icons/fa";
import { TTrack } from "@/types/lastfm";

export default function NowPlayingCard({ track }: { track: TTrack }) {
  return (
    <div className="flex flex-col mt-6">
      <h2 className="text-sm font-semibold uppercase text-base-content mb-3">
        Now Playing
      </h2>
      <div className="bg-base-100 p-3 rounded-xl flex items-center gap-4 shadow-md">
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <Image
            src={track.image}
            alt={track.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{track.name}</p>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
        </div>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 p-2 rounded-full"
        >
          <FaLastfm />
        </a>
      </div>
    </div>
  );
}
