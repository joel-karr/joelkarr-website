function jsonResponse(status, payload) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
}

function scoreRoute(item, terms) {
  const title = (item.title || '').toLowerCase();
  const description = (item.description || '').toLowerCase();
  const path = (item.path || '').toLowerCase();
  const keywords = Array.isArray(item.keywords) ? item.keywords.join(' ').toLowerCase() : '';

  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 6;
    if (keywords.includes(term)) score += 4;
    if (description.includes(term)) score += 2;
    if (path.includes(term)) score += 3;
  }

  return score;
}

function localSuggestions(query, routeCatalog) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);

  if (terms.length === 0) return [];

  return routeCatalog
    .map((item) => ({ item, score: scoreRoute(item, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}

function extractFirstJsonObject(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    // Continue to regex extraction.
  }

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function normalizeCatalog(routeCatalog) {
  if (!Array.isArray(routeCatalog)) return [];

  return routeCatalog
    .filter((r) => r && typeof r.path === 'string' && typeof r.title === 'string')
    .map((r) => ({
      title: String(r.title),
      description: typeof r.description === 'string' ? r.description : '',
      path: String(r.path),
      keywords: Array.isArray(r.keywords) ? r.keywords.map((k) => String(k)) : [],
    }));
}

async function callAzureOpenAI({ query, currentPath, routeCatalog }) {
  const deployment = 'gpt-4o-mini';
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-10-21';

  if (!endpoint || !apiKey) {
    return {
      ok: false,
      error: 'Azure OpenAI endpoint/key are not configured on the server.',
    };
  }

  const safeEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  const url = `${safeEndpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const routeContext = routeCatalog
    .map((r, i) => `${i + 1}. ${r.title} | ${r.path} | ${r.description}`)
    .join('\n');

  const systemPrompt = [
    'You are GW Route Assistant for joelkarr.com.',
    'Your task is to help users find relevant pages on the site.',
    'Use only the routes provided in ROUTE_CATALOG.',
    'Never invent routes.',
    'Return strict JSON with shape: {"message": string, "paths": string[]}.',
    'Return at most 3 paths, each must be an exact path from ROUTE_CATALOG.'
  ].join(' ');

  const userPrompt = [
    `BROKEN_PATH: ${currentPath || '/'}`,
    `USER_QUERY: ${query}`,
    'ROUTE_CATALOG:',
    routeContext,
    'Respond with only JSON.'
  ].join('\n\n');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      error: `Azure OpenAI request failed with status ${response.status}.`,
    };
  }

  const result = await response.json();
  const content = result?.choices?.[0]?.message?.content;
  const parsed = extractFirstJsonObject(content);

  if (!parsed || typeof parsed.message !== 'string' || !Array.isArray(parsed.paths)) {
    return {
      ok: false,
      error: 'Model response was not in expected JSON format.',
    };
  }

  return {
    ok: true,
    message: parsed.message,
    paths: parsed.paths,
  };
}

export default async function (context, req) {
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        Allow: 'POST, OPTIONS',
      },
    };
    return;
  }

  if (req.method !== 'POST') {
    context.res = jsonResponse(405, { error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const query = typeof body.query === 'string' ? body.query.trim() : '';
  const currentPath = typeof body.currentPath === 'string' ? body.currentPath : '/';
  const routeCatalog = normalizeCatalog(body.routeCatalog);

  if (!query) {
    context.res = jsonResponse(400, { error: 'query is required' });
    return;
  }

  if (routeCatalog.length === 0) {
    context.res = jsonResponse(400, { error: 'routeCatalog is required' });
    return;
  }

  const aiResult = await callAzureOpenAI({ query, currentPath, routeCatalog });

  if (aiResult.ok) {
    const suggestionSet = new Set(aiResult.paths);
    const suggestions = routeCatalog.filter((route) => suggestionSet.has(route.path)).slice(0, 3);

    context.res = jsonResponse(200, {
      source: 'azure-openai',
      message: aiResult.message,
      suggestions,
    });
    return;
  }

  const suggestions = localSuggestions(`${query} ${currentPath}`, routeCatalog);
  context.res = jsonResponse(200, {
    source: 'fallback',
    message:
      'I could not reach the model right now, but these links are still likely to help based on your query.',
    suggestions,
    warning: aiResult.error,
  });
}
