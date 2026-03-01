import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://joelkarr.com';

interface PostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}

function loadPostMeta(contentDir: string): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data } = matter(raw);
      return {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author || 'Joel Karr',
        tags: data.tags || [],
        slug: data.slug || file.replace('.md', ''),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(posts: PostMeta[]): string {
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { loc: SITE_URL, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE_URL}/blog`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${SITE_URL}/llms.txt`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${SITE_URL}/llms-full.txt`, priority: '0.7', changefreq: 'monthly' },
  ];

  const postEntries = posts.map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.date,
  }));

  const allEntries = [...staticPages.map((p) => ({ ...p, lastmod: today })), ...postEntries];

  const urls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function generateRSS(posts: PostMeta[]): string {
  const buildDate = new Date().toUTCString();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(post.author)}</author>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Joel Karr Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Insights on AI-era software development, deliberate engineering practices, and building software that lasts.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>joel@joelkarr.com (Joel Karr)</managingEditor>
    <webMaster>joel@joelkarr.com (Joel Karr)</webMaster>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>Joel Karr Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>
`;
}

function generateLlmsTxt(posts: PostMeta[]): string {
  const blogSection =
    posts.length > 0
      ? `

## Blog Posts

${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`).join('\n')}`
      : '';

  return `# Joel Karr

> Joel Karr is a Chief Technology Officer, author, and engineering leader specializing in AI-driven software development. He is the author of "Don't Think When You Code" and the creator of the ARC methodology. This site covers his work in engineering leadership, deliberate practice, software craft, and the GW Tech community.

## About

Joel Karr is a CTO with over 20 years of experience in software engineering. He began programming at age 10 with QuickBASIC in small-town Illinois. His career spans platform modernizations, production crisis management, and AI-driven transformations. He believes mastery comes from drilling one small detail at a time.

- Email: joel@joelkarr.com
- LinkedIn: https://linkedin.com/in/joelkarr
- Website: https://joelkarr.com

## Book: Don't Think When You Code

A book about the craft of software engineering in the AI era, coming Summer 2026. Drawn from 20+ years of experience building high-performing teams, surviving production disasters, and learning that mastery comes from deliberate practice.

The book is organized into three parts:
- Part 1: The Craft of Software Engineering
- Part 2: Leading Engineering Teams
- Part 3: The Path to Engineering Leadership

## ARC Methodology

ARC is a methodology for AI-era software development where the bottleneck is not typing speed but whether you are solving the right problem. It shifts focus from maximizing output to maximizing outcomes.

The six steps of ARC are:
1. Opportunities: Start with valuable outcomes, not feature requests
2. Ventures: Parallel work streams owned end-to-end by a single engineer
3. Task Templates: Shorthand for common task groups containing interfaces, objects, and tasks
4. Team Review: Review expensive-to-change design decisions, then trust the engineer
5. Build and Test: Engineers build with AI-assisted tools, test incrementally
6. Measure: Evaluate ventures against success metrics and feed insights back

## GW Tech

GW Tech is a technology community founded by Joel Karr in 2016. It connects software engineers, engineering leaders, and technologists passionate about innovation and software craft.

- LinkedIn Group: https://www.linkedin.com/groups/15863032/
${blogSection}

## Links

- [Full details](${SITE_URL}/llms-full.txt): Extended reference for AI systems
- [Website](${SITE_URL}): Joel Karr's personal website
- [Blog](${SITE_URL}/blog): Blog posts on software engineering
- [RSS Feed](${SITE_URL}/rss.xml): RSS feed for blog updates
- [Sitemap](${SITE_URL}/sitemap.xml): Site map
`;
}

export default function blogStaticAssets(): Plugin {
  const contentDir = path.resolve(__dirname, '../content/blog');

  return {
    name: 'vite-plugin-blog-static-assets',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist');
      const posts = loadPostMeta(contentDir);

      // Generate and write static assets
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), generateSitemap(posts), 'utf-8');
      console.log(`  ✓ Generated sitemap.xml (${posts.length} blog posts + static pages)`);

      fs.writeFileSync(path.join(outDir, 'rss.xml'), generateRSS(posts), 'utf-8');
      console.log(`  ✓ Generated rss.xml (${posts.length} items)`);

      fs.writeFileSync(path.join(outDir, 'llms.txt'), generateLlmsTxt(posts), 'utf-8');
      console.log(`  ✓ Generated llms.txt (with ${posts.length} blog posts)`);
    },
  };
}
