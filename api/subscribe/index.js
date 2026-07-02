const sgMail = require('@sendgrid/mail');

function jsonResponse(status, payload) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const email = (body.email || '').trim();
  const source = (body.source || 'website').trim().slice(0, 100);

  if (!EMAIL_RE.test(email)) {
    context.res = jsonResponse(400, { error: 'A valid email address is required' });
    return;
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    context.log.error('SENDGRID_API_KEY is not configured');
    context.res = jsonResponse(500, { error: 'Email service is not configured' });
    return;
  }

  sgMail.setApiKey(apiKey);

  const htmlBody = `
    <h2>New Book Launch List Signup</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Source</td><td style="padding:8px;border-bottom:1px solid #eee;">${source}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${new Date().toISOString()}</td></tr>
    </table>
  `;

  try {
    await sgMail.send({
      to: 'joelkarr@gmail.com',
      // Reuses the sender already verified in SendGrid for the awards form.
      // Swap to a dedicated address (e.g. book@joelkarr.com) once verified.
      from: 'awards@joelkarr.com',
      replyTo: email,
      subject: `Launch list signup: ${email}`,
      html: htmlBody,
    });

    context.res = jsonResponse(200, { success: true });
  } catch (err) {
    context.log.error('SendGrid error:', err?.response?.body || err.message);
    context.res = jsonResponse(500, { error: 'Something went wrong. Please try again.' });
  }
};