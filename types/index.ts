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
