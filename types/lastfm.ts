export type TTrack = {
    artist: string;
    name: string;
    image: string;
    url: string;
    date?: string;
  };
  
  export type LastFmResponse = {
    nowPlaying: TTrack | null;
    history: TTrack[];
  };

  export type LastFmApiTrack = {
    artist: {
      mbid: string;
      ['#text']: string;
    };
    streamable: string;
    image: {
      size: 'small' | 'medium' | 'large' | 'extralarge';
      ['#text']: string;
    }[];
    mbid: string;
    album: {
      mbid: string;
      ['#text']: string;
    };
    name: string;
    url: string;
    date?: {
      uts: string;
      ['#text']: string;
    };
    ['@attr']?: {
      nowplaying: "true" | "false";
    };
  };
  
  export type LastFmApiResponse = {
    recenttracks: {
      track: LastFmApiTrack[];
      ['@attr']: {
        user: string;
        totalPages: string;
        page: string;
        perPage: string;
        total: string;
      };
    };
  };
  