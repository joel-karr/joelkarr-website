import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const VIRTUAL_MODULE_ID = 'virtual:blog-posts';
const RESOLVED_ID = '\0' + VIRTUAL_MODULE_ID;

export default function blogContent(): Plugin {
  const contentDir = path.resolve(__dirname, '../content/blog');

  function loadPosts(): string {
    if (!fs.existsSync(contentDir)) {
      return 'export default [];';
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    const posts = files.map(file => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'Joel Karr',
        tags: data.tags || [],
        slug: data.slug || file.replace('.md', ''),
        readingTime: data.readingTime || `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
        image: data.image || '',
        imageAlt: data.imageAlt || '',
        content,
      };
    });

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return `export default ${JSON.stringify(posts)};`;
  }

  return {
    name: 'vite-plugin-blog-content',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) return loadPosts();
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(contentDir) && file.endsWith('.md')) {
        const module = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }
      }
    },
  };
}
