import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = 'https://joelkarr.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function SEOHead({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = 'Joel Karr - AI-Era Software Development',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  jsonLd,
}: SEOHeadProps) {
  const fullUrl = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | Joel Karr`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="Joel Karr" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Article-specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {tags?.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
