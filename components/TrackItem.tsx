import Image from "next/image";
import { TTrack } from "@/types/lastfm";

export default function TrackItem({ track }: { track: TTrack }) {
  return (
    <div className="bg-base-100 p-2 rounded-lg flex items-center gap-3">
      <div className="w-10 h-10 rounded-md overflow-hidden">
        <Image
          src={track.image}
          alt={track.name}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{track.name}</p>
        <p className="text-xs text-gray-500 truncate">{track.artist}</p>
      </div>
    </div>
  );
}
