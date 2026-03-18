const sgMail = require('@sendgrid/mail');

const VALID_AWARDS = ['innovator', 'craft', 'community-builder'];
const AWARD_LABELS = {
  innovator: 'Innovator of the Year',
  craft: 'The Craft Award',
  'community-builder': 'Community Builder of the Year',
};

function jsonResponse(status, payload) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
}

function validate(body) {
  const errors = [];

  if (!body.award || !VALID_AWARDS.includes(body.award)) {
    errors.push('award must be one of: innovator, craft, community-builder');
  }
  if (!body.nomineeName || body.nomineeName.trim().length < 2) {
    errors.push('nomineeName is required (min 2 characters)');
  }
  if (!body.nomineeTitle || body.nomineeTitle.trim().length < 2) {
    errors.push('nomineeTitle is required');
  }
  if (!body.nomineeCompany || body.nomineeCompany.trim().length < 2) {
    errors.push('nomineeCompany is required');
  }
  if (!body.nomineePhone || body.nomineePhone.trim().length < 7) {
    errors.push('nomineePhone is required');
  }
  if (!body.nomineeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.nomineeEmail)) {
    errors.push('a valid nomineeEmail is required');
  }
  if (!body.nominatorName || body.nominatorName.trim().length < 2) {
    errors.push('nominatorName is required (min 2 characters)');
  }
  if (!body.nominatorEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.nominatorEmail)) {
    errors.push('a valid nominatorEmail is required');
  }
  if (!body.justification || body.justification.trim().length < 50) {
    errors.push('justification is required (min 50 characters)');
  }
  if (body.justification && body.justification.length > 5000) {
    errors.push('justification must be under 5000 characters');
  }

  return errors;
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
  const errors = validate(body);

  if (errors.length > 0) {
    context.res = jsonResponse(400, { error: errors.join('; ') });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    context.log.error('SENDGRID_API_KEY is not configured');
    context.res = jsonResponse(500, { error: 'Email service is not configured' });
    return;
  }

  const awardLabel = AWARD_LABELS[body.award];

  const htmlBody = `
    <h2>New GW Tech Award Nomination</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Award</td><td style="padding:8px;border-bottom:1px solid #eee;">${awardLabel}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nominee</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nomineeName.trim()}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Title</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nomineeTitle.trim()}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nomineeCompany.trim()}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nomineePhone.trim()}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nominee Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nomineeEmail.trim()}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nominated By</td><td style="padding:8px;border-bottom:1px solid #eee;">${body.nominatorName.trim()} (${body.nominatorEmail.trim()})</td></tr>
    </table>
    <h3 style="margin-top:24px;">Justification</h3>
    <p style="white-space:pre-wrap;line-height:1.6;">${body.justification.trim()}</p>
  `;

  sgMail.setApiKey(apiKey);

  try {
    await sgMail.send({
      to: 'joel@joelkarr.com',
      from: 'awards@joelkarr.com',
      replyTo: body.nominatorEmail.trim(),
      subject: `GW Tech Nomination: ${awardLabel} — ${body.nomineeName.trim()}`,
      html: htmlBody,
    });

    context.res = jsonResponse(200, { success: true });
  } catch (err) {
    context.log.error('SendGrid error:', err?.response?.body || err.message);
    context.res = jsonResponse(500, { error: 'Failed to submit nomination. Please try again.' });
  }
};
