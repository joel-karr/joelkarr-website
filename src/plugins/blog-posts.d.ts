declare module 'virtual:blog-posts' {
  import type { BlogPost } from '@/lib/blogTypes';
  const posts: BlogPost[];
  export default posts;
}
