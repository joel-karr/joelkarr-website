import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrDir = path.resolve(rootDir, 'dist-ssr');
const blogContentDir = path.resolve(rootDir, 'src/content/blog');

async function prerender() {
  // Read the built index.html as template
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Import the SSR bundle (use pathToFileURL for Windows compatibility)
  const ssrEntryPath = path.join(ssrDir, 'entry-static.js');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  // Discover routes
  const routes = ['/', '/blog'];

  // Auto-discover blog post routes from content directory
  if (fs.existsSync(blogContentDir)) {
    const blogFiles = fs.readdirSync(blogContentDir).filter(f => f.endsWith('.md'));
    for (const file of blogFiles) {
      const slug = file.replace('.md', '');
      routes.push(`/blog/${slug}`);
    }
  }

  console.log(`Pre-rendering ${routes.length} routes...`);

  for (const route of routes) {
    const { html: appHtml, helmetContext } = render(route);
    const helmet = helmetContext.helmet;

    // Build head tags from Helmet
    const headTags = [
      helmet?.title?.toString() || '',
      helmet?.meta?.toString() || '',
      helmet?.link?.toString() || '',
      helmet?.script?.toString() || '',
    ]
      .filter(Boolean)
      .join('\n    ');

    // Inject rendered HTML into the root div
    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // Inject Helmet head tags before </head>
    if (headTags) {
      page = page.replace('</head>', `    ${headTags}\n  </head>`);
    }

    // Determine output file path
    const filePath =
      route === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, route, 'index.html');

    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, page, 'utf-8');
    console.log(`  ✓ ${route} → ${path.relative(distDir, filePath)}`);
  }

  console.log(`\nPre-rendered ${routes.length} routes successfully.`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
