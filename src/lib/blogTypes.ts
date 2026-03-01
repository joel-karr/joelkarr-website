export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
  readingTime: string;
  image: string;
  imageAlt: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
