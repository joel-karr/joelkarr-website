import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://www.joelkarr.com';

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
    { loc: `${SITE_URL}/awards`, priority: '0.8', changefreq: 'monthly' },
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
- Website: https://www.joelkarr.com

## Book: Don't Think When You Code

A book about the craft of software engineering in the AI era, coming Summer 2026. Drawn from 20+ years of experience building high-performing teams, surviving production disasters, and learning that mastery comes from deliberate practice.

Chapter highlights include:
- Chapter 1: Flow state for software engineers and deep focus
- Chapter 2: Deliberate practice to become a better software engineer
- Chapter 3: Task templates that speed up the software development lifecycle (SDLC)
- Chapter 4: Mental models for architecture decisions and legacy code
- Chapter 5: Better problem framing before estimates and delivery planning
- Chapter 9: Making engineering decisions durable under pressure
- Chapter 10: Feedback systems that improve software team velocity
- Chapter 16: AI prompt templates for the AI software lifecycle and modern SDLC

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
- [GW Tech Annual Awards](${SITE_URL}/awards): Peer nominations for Innovator of the Year, The Craft Award, and Community Builder of the Year
${blogSection}

## Links

- [Full details](${SITE_URL}/llms-full.txt): Extended reference for AI systems
- [Website](${SITE_URL}): Joel Karr's personal website
- [Blog](${SITE_URL}/blog): Blog posts on software engineering
- [GW Tech Awards](${SITE_URL}/awards): Annual awards nominations
- [RSS Feed](${SITE_URL}/rss.xml): RSS feed for blog updates
- [Sitemap](${SITE_URL}/sitemap.xml): Site map
`;
}

function generateLlmsFullTxt(posts: PostMeta[], contentDir: string): string {
  const blogSection =
    posts.length > 0
      ? `

## Blog Posts

${posts
  .map((post) => {
    const filePath = path.join(contentDir, `${post.slug}.md`);
    const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
    const { content } = matter(raw);
    return `### ${post.title}

- URL: ${SITE_URL}/blog/${post.slug}
- Date: ${post.date}
- Tags: ${post.tags.join(', ')}

${content.trim()}`;
  })
  .join('\n\n---\n\n')}`
      : '';

  return `# Joel Karr -- Full Reference

> Joel Karr is a Chief Technology Officer, author of "Don't Think When You Code," and creator of the ARC methodology for AI-era software development. With over 20 years of engineering leadership experience, he specializes in deliberate practice, software craft, platform modernization, and building high-performing engineering teams. He founded the GW Tech community in 2016.

## About Joel Karr

Joel Karr is a Chief Technology Officer with over 20 years in software engineering. His journey began at age 10 in small-town Illinois, learning QuickBASIC from a book his father found at a university bookstore. That early curiosity grew into a career defined by a core principle: mastery comes from drilling one small detail at a time.

Throughout his career, Joel has led engineering teams through full-scale platform modernizations, survived Cyber Monday crashes that cost hundreds of thousands in lost revenue, and built engineering cultures rooted in deliberate practice. He teaches through stories, not lectures, connecting software engineering to craftsmanship, psychology, and the emerging role of AI in software development.

Joel believes the future of AI-driven software development is not about typing faster -- it is about solving the right problems with clarity, discipline, and respect for the craft.

### Areas of Expertise

- Software Engineering
- AI-Driven Software Development
- Engineering Leadership
- Deliberate Practice
- Software Craft
- Team Building
- Platform Modernization
- ARC Methodology

### Contact

- Email: joel@joelkarr.com
- LinkedIn: https://linkedin.com/in/joelkarr
- Website: https://www.joelkarr.com

## Book: Don't Think When You Code

"Don't Think When You Code" is a book about the craft of software engineering in the AI era, coming Summer 2026. It is drawn from over 20 years of experience building high-performing teams, surviving production disasters, and learning that mastery comes from deliberate practice -- drilling one small detail at a time.

From learning QuickBASIC as a 10-year-old in small-town Illinois to leading engineering teams through full-scale platform modernizations and AI transformations, Joel shares the stories, frameworks, and hard-won lessons that shaped his approach to building software and leading engineers.

### Part 1: The Craft of Software Engineering

Topics covered:
- Finding flow states as a software engineer
- Deliberate practice in software engineering
- Pattern recognition and reducing cognitive load
- Using analogies as engineering decision frameworks
- How AI transforms the craft of writing software

### Part 2: Leading Engineering Teams

Topics covered:
- The illusion of alignment in engineering organizations
- Making architectural decisions durable
- The feedback paradox and psychological safety
- Performing under pressure during production outages
- Spreading ideas by showing, not telling

### Part 3: The Path to Engineering Leadership

Topics covered:
- Reducing uncertainty in software projects
- Why big bang platform rewrites fail
- Turning around struggling engineering teams
- Protecting focus in chaotic engineering environments
- Engineering leadership as a deliberate practice

## ARC Methodology

ARC is a methodology designed for the AI era, where the bottleneck is not typing speed -- it is whether you are solving the right problem. AI-assisted planning, code generation, and automated reviews have fundamentally changed development velocity. But speed without direction creates waste, and most software teams are optimizing for output instead of outcomes.

The ARC methodology shifts your team's focus from maximizing output to maximizing outcomes. It respects the craft of software engineering while embracing AI tools that amplify human judgment and engineering expertise. It is built on principles learned from 20+ years of engineering leadership, deliberate practice, and surviving production disasters at scale.

### The Six Steps of ARC

#### Step 1: Opportunities
Start with valuable outcomes, not feature requests. Define success metrics before work begins. Each opportunity represents a measurable business outcome your team should pursue.

#### Step 2: Ventures
Each opportunity spawns multiple parallel ventures, each owned end-to-end by a single engineer with AI-assisted development tools. Ventures are independent work streams that allow parallel execution.

#### Step 3: Task Templates
Use task templates as shorthand for common task groups engineers already understand. Each template contains interfaces, objects, and tasks that structure the work without over-specifying implementation details.

#### Step 4: Team Review
Review design decisions that are expensive to change, such as interfaces, data structures, and resilience plans. After review, trust the engineer to build. Focus review effort on what matters most.

#### Step 5: Build and Test
Engineers build with AI-assisted coding tools, test incrementally, and validate against success criteria before shipping. The focus is on meeting the defined success metrics from step one.

#### Step 6: Measure
Evaluate ventures against the success metrics defined in step one. Learn from outcomes and feed insights back into future opportunities. This closes the loop and drives continuous improvement.

### Why ARC Differs from Traditional Approaches

ARC was designed specifically for teams using AI-assisted development tools. It focuses on outcomes over output, trusts individual engineers with end-to-end ownership, and structures review around decisions that are expensive to reverse rather than line-by-line code review.

## GW Tech Community

GW Tech is a technology community founded by Joel Karr in 2016. It connects software engineers, engineering leaders, and technologists who are passionate about innovation and software craft. What started as a gathering of curious minds has grown into a vibrant network focused on sharing ideas, building connections, and exploring innovation in AI-era software development.

### Community Features

- Community-Driven: Connect with software engineers, engineering leaders, and technologists who share a passion for software craft and deliberate practice.
- Tech Events: Regular meetups, tech talks, and events exploring AI-driven development, engineering leadership, and software craft.
- Annual Awards (Now Accepting Nominations): Recognizing excellence and innovation in technology through the inaugural GW Tech Annual Awards. Three peer-nominated awards: Innovator of the Year, The Craft Award, and Community Builder of the Year. Nominate at ${SITE_URL}/awards.

### Join GW Tech

- LinkedIn Group: https://www.linkedin.com/groups/15863032/
- Annual Awards: ${SITE_URL}/awards
${blogSection}
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

      fs.writeFileSync(path.join(outDir, 'llms-full.txt'), generateLlmsFullTxt(posts, contentDir), 'utf-8');
      console.log(`  ✓ Generated llms-full.txt (with ${posts.length} blog posts, full content)`);
    },
  };
}
