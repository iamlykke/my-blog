export interface PostMetadata {
  title: string;
  description: string;
  created: string;
  tags: string[];
  draft: boolean;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export interface TravelMetadata {
  title: string;
  country: string;
  date: string;
  year: number;
  order: number;
  description?: string;
  draft?: boolean;
}

export interface Travel {
  slug: string;
  metadata: TravelMetadata;
  content: string;
}

export interface ConcertMetadata {
  artist: string;
  date: string; // ISO: YYYY-MM-DD
  location: string;
  venue?: string;
  year: number;
  draft?: boolean;
}

export interface Concert {
  slug: string;
  metadata: ConcertMetadata;
  content: string;
  hasContent: boolean;
}
