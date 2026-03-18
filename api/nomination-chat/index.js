const AWARD_CRITERIA = {
  innovator: {
    label: 'Innovator of the Year',
    focus: 'identifying meaningful opportunities and delivering measurable outcomes using modern tools and ARC methodology principles',
  },
  craft: {
    label: 'The Craft Award',
    focus: 'deliberate practice, reusable patterns, task templates, mental models, and elevating code quality and engineering standards',
  },
  'community-builder': {
    label: 'Community Builder of the Year',
    focus: 'mentorship, knowledge sharing, building psychological safety, and strengthening the engineering community',
  },
};

function jsonResponse(status, payload) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
}

function buildSystemPrompt() {
  const awardList = Object.entries(AWARD_CRITERIA)
    .map(([key, v]) => `- "${key}": ${v.label} — ${v.focus}`)
    .join('\n');

  return [
    'You are the GW Tech Awards nomination interviewer.',
    'Your job is to have a warm, conversational interview with someone who wants to nominate a peer for an award.',
    'You need to collect all of the following before the nomination can be submitted:',
    '',
    'ABOUT THE NOMINEE:',
    '  1. Which award category (innovator, craft, or community-builder). A person can only be nominated for one.',
    '  2. Nominee\'s full name (first and last)',
    '  3. Nominee\'s job title',
    '  4. Nominee\'s company or team',
    '  5. Nominee\'s phone number',
    '  6. Nominee\'s email address',
    '',
    'ABOUT THE NOMINATOR (the person you\'re talking to):',
    '  7. Nominator\'s full name (first and last)',
    '  8. Nominator\'s email address',
    '',
    'JUSTIFICATION:',
    '  9. A compelling justification — dig into specifics: what did the nominee do, what was the impact, why does it matter?',
    '',
    'Award categories:',
    awardList,
    '',
    'Interview style:',
    '- Be conversational and encouraging, like a friendly colleague.',
    '- Ask one or two questions at a time, not all at once.',
    '- When gathering the justification, ask follow-up questions to draw out concrete examples, impact, and specifics. Don\'t settle for vague praise.',
    '- Keep responses to 2-3 sentences max before asking the next question.',
    '- If someone gives you info for multiple fields at once, acknowledge it and move on.',
    '',
    'The user may type "/recap" — when they do, present a summary of everything collected so far, note any missing fields, and continue interviewing.',
    '',
    'CRITICAL: You MUST ALWAYS respond with ONLY a JSON object. No markdown, no code fences, no extra text.',
    'The JSON shape is:',
    '{',
    '  "message": "your conversational response",',
    '  "phase": "interviewing" | "summary",',
    '  "nomination": null | {',
    '    "award": string,',
    '    "nomineeName": string,',
    '    "nomineeTitle": string,',
    '    "nomineeCompany": string,',
    '    "nomineePhone": string,',
    '    "nomineeEmail": string,',
    '    "nominatorName": string,',
    '    "nominatorEmail": string,',
    '    "justification": string',
    '  }',
    '}',
    '',
    'Rules for phase transitions:',
    '- Use "interviewing" while you are still gathering information.',
    '- Once you have ALL nine fields with enough detail (justification should be substantial — at least a few sentences with concrete examples), switch to "summary".',
    '- When phase is "summary", your message should present a nicely formatted plain-text summary of the full nomination and ask if they\'re ready to type /submit or want to change anything.',
    '- When phase is "summary", the nomination object MUST be fully populated with all fields.',
    '- If the user wants changes after seeing the summary, go back to "interviewing" to collect the changes, then present the summary again.',
    '',
    'Always populate the nomination object with whatever fields you have collected so far, even during "interviewing" phase. Use empty strings for fields not yet collected.',
    'Never fabricate information. Only include what the nominator actually told you.',
  ].join('\n');
}

async function callAzureOpenAI(messages) {
  const deployment = 'gpt-4o-mini';
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-10-21';

  if (!endpoint || !apiKey) {
    return { ok: false, error: 'Azure OpenAI is not configured.' };
  }

  const safeEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
  const url = `${safeEndpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      messages,
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    return { ok: false, error: `Azure OpenAI returned status ${response.status}` };
  }

  const result = await response.json();
  const content = result?.choices?.[0]?.message?.content;

  if (!content) {
    return { ok: false, error: 'No content in model response.' };
  }

  // Extract JSON from response
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        return { ok: false, error: 'Could not parse model response as JSON.' };
      }
    } else {
      // Model returned plain text — wrap it as an interviewing response
      return {
        ok: true,
        data: { message: content.trim(), phase: 'interviewing', nomination: null },
      };
    }
  }

  if (!parsed.message || !parsed.phase) {
    // Partial JSON — salvage the message if possible
    if (parsed.message) {
      return {
        ok: true,
        data: { message: parsed.message, phase: parsed.phase || 'interviewing', nomination: parsed.nomination || null },
      };
    }
    return { ok: false, error: 'Model response missing required fields.' };
  }

  return { ok: true, data: parsed };
}

module.exports = async function (context, req) {
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { Allow: 'POST, OPTIONS' } };
    return;
  }

  if (req.method !== 'POST') {
    context.res = jsonResponse(405, { error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const history = Array.isArray(body.history) ? body.history : [];

  // Validate history entries
  const validRoles = new Set(['user', 'assistant']);
  const sanitized = history
    .filter((m) => m && validRoles.has(m.role) && typeof m.content === 'string')
    .slice(-30); // Keep last 30 messages to stay within token limits

  if (sanitized.length === 0) {
    context.res = jsonResponse(400, { error: 'history must contain at least one user message' });
    return;
  }

  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    ...sanitized,
  ];

  const result = await callAzureOpenAI(messages);

  if (!result.ok) {
    context.res = jsonResponse(502, { error: result.error });
    return;
  }

  context.res = jsonResponse(200, result.data);
};
