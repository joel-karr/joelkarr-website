import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Lightbulb,
  Users,
  Wrench,
  Calendar,
  Terminal,
  ChevronRight,
  CheckCircle2,
  CalendarPlus,
  Send,
  UserSearch,
  Trophy,
  PartyPopper,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import logo from '@/assets/b7a220cbd0224ff4115d16c15bd8c8d837d3cccd.png';

/* ─── Award Data ─────────────────────────────────────── */

const AWARD_CATEGORIES = [
  {
    id: 'innovator',
    title: 'Innovator of the Year',
    tagline: 'Outcomes over output',
    category: 'Impact & Innovation',
    description:
      'This award recognizes someone who identified a meaningful opportunity and delivered measurable outcomes, not just shipped features. Built on the ARC methodology principles.',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500',
    image:
      'https://images.unsplash.com/photo-1771189956777-575006b6b145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzY3MzU4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    criteria: [
      'Identified a valuable opportunity others overlooked',
      'Defined clear success metrics before starting work',
      'Delivered measurable outcomes, not just output volume',
      'Used modern tools to amplify judgment, not replace it',
      'Demonstrated that speed with direction beats speed alone',
    ],
  },
  {
    id: 'craft',
    title: 'The Craft Award',
    tagline: 'Mastery through deliberate practice',
    category: 'Technical Excellence',
    description:
      'This award recognizes an engineer who visibly invests in their craft and raises the quality bar through intentional practice. Inspired by "Don\'t Think When You Code" principles.',
    icon: Wrench,
    color: 'from-purple-500 to-pink-500',
    image:
      'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM3MTIwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    criteria: [
      'Demonstrates systematic improvement through deliberate practice',
      'Builds or shares reusable patterns, task templates, and mental models',
      'Invests in deep work: code reading, constraint-based exercises, decision journaling',
      'Makes architecture decisions that hold up under pressure',
      'Elevates code quality and engineering standards around them',
    ],
  },
  {
    id: 'community-builder',
    title: 'Community Builder of the Year',
    tagline: 'Lift the people around you',
    category: 'Leadership & Mentorship',
    description:
      'This award recognizes someone who strengthens the community through mentorship, knowledge sharing, and culture. Aligned with engineering leadership principles and GW Tech\'s founding mission.',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    image:
      'https://images.unsplash.com/photo-1728933102332-a4f1a281a621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2glMjBvZmZpY2V8ZW58MXx8fHwxNzczNjUzOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    criteria: [
      'Creates environments where engineers feel safe to take risks and give honest feedback',
      'Shares knowledge through talks, writing, mentoring, or open source contributions',
      'Builds team culture rooted in learning and deliberate practice',
      'Helps others grow by showing, not just telling',
      'Strengthens connections across the engineering community',
    ],
  },
];


/* ─── Glass Award SVG ────────────────────────────────── */

function GlassAward() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 5 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <svg width="320" height="400" viewBox="0 0 320 400" fill="none" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
          </linearGradient>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
          <radialGradient id="logoGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(96,165,250,0.5)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.2)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
          <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.7)" />
          </linearGradient>
          <linearGradient id="shadowGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </linearGradient>
          <clipPath id="logoClip">
            <rect x="100" y="100" width="120" height="120" rx="8" />
          </clipPath>
        </defs>

        <ellipse cx="160" cy="385" rx="110" ry="12" fill="rgba(0,0,0,0.4)" opacity="0.6" />
        <rect x="90" y="350" width="140" height="30" rx="4" fill="url(#glassGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <rect x="90" y="350" width="140" height="3" rx="2" fill="url(#edgeHighlight)" />
        <rect x="70" y="50" width="180" height="300" rx="8" fill="url(#glassGradient)" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
        <rect x="75" y="55" width="170" height="290" rx="6" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
        <rect x="70" y="50" width="8" height="300" rx="8" fill="rgba(255,255,255,0.4)" />
        <rect x="70" y="50" width="180" height="12" rx="8" fill="url(#edgeHighlight)" opacity="0.8" />
        <rect x="95" y="60" width="35" height="280" rx="17" fill="url(#shineGradient)" opacity="0.6" />
        <rect x="140" y="70" width="20" height="260" rx="10" fill="rgba(255,255,255,0.15)" />
        <circle cx="160" cy="160" r="70" fill="url(#logoGlow)" />

        <foreignObject x="100" y="100" width="120" height="120" clipPath="url(#logoClip)">
          <div
            style={{
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <img
              src={logo}
              alt="GW Logo"
              style={{ width: '90px', height: '90px', filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.6))' }}
            />
          </div>
        </foreignObject>

        <text x="160" y="250" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="28" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="4" style={{ filter: 'drop-shadow(0 2px 8px rgba(96,165,250,0.5))' }}>
          GW
        </text>
        <text x="160" y="310" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2">EXCELLENCE</text>
        <text x="160" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="14" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="2">2026</text>
        <rect x="70" y="340" width="180" height="10" rx="8" fill="url(#shadowGradient)" opacity="0.3" />

        <motion.circle cx="220" cy="100" r="3" fill="white" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="85" cy="180" r="2" fill="white" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />
        <motion.circle cx="230" cy="260" r="2.5" fill="white" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.4 }} />
        <motion.circle cx="110" cy="320" r="2" fill="white" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 2.1 }} />
      </svg>
    </motion.div>
  );
}

/* ─── Image With Fallback ────────────────────────────── */

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [didError, setDidError] = useState(false);
  if (didError) {
    return <div className={`bg-slate-800 ${className ?? ''}`} />;
  }
  return <img src={src} alt={alt} className={className} onError={() => setDidError(true)} />;
}

/* ─── CLI Nomination Terminal ────────────────────────── */

interface CLIMessage {
  type: 'system' | 'user' | 'prompt' | 'error';
  text: string;
  id: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface NominationData {
  award: string;
  nomineeName: string;
  nomineeTitle: string;
  nomineeCompany: string;
  nomineePhone: string;
  nomineeEmail: string;
  nominatorName: string;
  nominatorEmail: string;
  justification: string;
}

function CLINomination() {
  const INITIAL_MESSAGES: CLIMessage[] = [
    { type: 'system', text: 'GW CLI v2.0.0 — Goat Wranglers Engineering Awards', id: 0 },
    { type: 'system', text: '────────────────────────────────────────────────────', id: 1 },
    { type: 'system', text: 'Powered by AI — I\'ll interview you to build the best nomination possible.', id: 2 },
    { type: 'system', text: 'Commands:  /recap — see current submission  |  /submit — submit nomination', id: 3 },
    { type: 'prompt', text: 'Tell me who you\'d like to nominate and for which award, or just say hi to get started.', id: 4 },
  ];

  const [displayMessages, setDisplayMessages] = useState<CLIMessage[]>(INITIAL_MESSAGES);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [nomination, setNomination] = useState<NominationData | null>(null);
  const [phase, setPhase] = useState<'interviewing' | 'summary' | 'submitted'>('interviewing');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayMessages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const addDisplay = (...msgs: Omit<CLIMessage, 'id'>[]) => {
    setDisplayMessages((prev) => [
      ...prev,
      ...msgs.map((m, i) => ({ ...m, id: Date.now() + i })),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || isLoading) return;
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const cmd = value.toLowerCase();

    // Handle /restart and /new
    if (cmd === '/restart') {
      resetCLI();
      return;
    }

    if (phase === 'submitted') {
      if (cmd === '/new') {
        resetCLI();
        return;
      }
      addDisplay(
        { type: 'user', text: `> ${value}` },
        { type: 'prompt', text: 'Type "/new" to submit another nomination.' }
      );
      return;
    }

    // Handle /submit
    if (cmd === '/submit') {
      addDisplay({ type: 'user', text: '> /submit' });
      if (!nomination || !nomination.nomineeName || !nomination.nominatorEmail || !nomination.justification || nomination.justification.length < 50) {
        addDisplay({ type: 'error', text: 'Not enough information to submit yet. Keep chatting or type /recap to see what\'s missing.' });
        return;
      }
      await submitNomination();
      return;
    }

    // Handle /recap
    if (cmd === '/recap') {
      addDisplay({ type: 'user', text: '> /recap' });
      if (!nomination) {
        addDisplay({ type: 'system', text: 'Nothing collected yet — let\'s get started!' });
        return;
      }
      const awardLabels: Record<string, string> = { innovator: 'Innovator of the Year', craft: 'The Craft Award', 'community-builder': 'Community Builder of the Year' };
      const fields = [
        ['Award', nomination.award ? (awardLabels[nomination.award] || nomination.award) : ''],
        ['Nominee', nomination.nomineeName],
        ['Title', nomination.nomineeTitle],
        ['Company', nomination.nomineeCompany],
        ['Phone', nomination.nomineePhone],
        ['Nominee Email', nomination.nomineeEmail],
        ['Your Name', nomination.nominatorName],
        ['Your Email', nomination.nominatorEmail],
      ];
      const missing = fields.filter(([, v]) => !v).map(([k]) => k);
      const filled = fields.map(([k, v]) => `  ${k}: ${v || '(missing)'}`).join('\n');
      addDisplay(
        { type: 'system', text: '\n────────────────── Nomination Recap ──────────────────' },
        { type: 'system', text: filled },
        { type: 'system', text: `\n  Justification: ${nomination.justification || '(missing)'}` },
        { type: 'system', text: '──────────────────────────────────────────────────────' },
      );
      if (missing.length > 0 || !nomination.justification || nomination.justification.length < 50) {
        addDisplay({ type: 'error', text: `Still needed: ${missing.length > 0 ? missing.join(', ') : ''}${(!nomination.justification || nomination.justification.length < 50) ? (missing.length > 0 ? ', ' : '') + 'more detail in justification' : ''}` });
      } else {
        addDisplay({ type: 'prompt', text: 'Looks complete! Type /submit to send, or keep chatting to make changes.' });
      }
      return;
    }

    // Normal conversational flow
    addDisplay({ type: 'user', text: `> ${value}` });

    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: value }];
    setChatHistory(newHistory);

    setIsLoading(true);
    addDisplay({ type: 'system', text: '...' });

    try {
      const res = await fetch('/api/nomination-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newHistory }),
      });

      // Remove the loading indicator
      setDisplayMessages((prev) => prev.filter((m) => m.text !== '...'));

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Something went wrong.' }));
        addDisplay({ type: 'error', text: err.error || 'Something went wrong. Try again.' });
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = { role: 'assistant', content: data.message };
      setChatHistory((prev) => [...prev, assistantMsg]);

      if (data.nomination) setNomination(data.nomination);

      if (data.phase === 'summary') {
        setPhase('summary');
        addDisplay(
          { type: 'prompt', text: data.message },
          { type: 'system', text: '\n────────────────────────────────────────────────────' },
          { type: 'system', text: '/submit — send nomination  |  /recap — review details  |  /restart — start over' },
        );
      } else {
        setPhase('interviewing');
        addDisplay({ type: 'prompt', text: data.message });
      }
    } catch {
      setDisplayMessages((prev) => prev.filter((m) => m.text !== '...'));
      addDisplay({ type: 'error', text: 'Could not reach the server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const submitNomination = async () => {
    if (!nomination) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/nominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nomination),
      });
      const data = await res.json();

      if (!res.ok) {
        addDisplay({ type: 'error', text: data.error || 'Submission failed. Try again.' });
      } else {
        setPhase('submitted');
        addDisplay(
          { type: 'system', text: '\nNomination submitted successfully!' },
          { type: 'system', text: 'Thank you for recognizing engineering excellence.' },
          { type: 'prompt', text: '\nType /new to submit another nomination.' }
        );
      }
    } catch {
      addDisplay({ type: 'error', text: 'Could not reach the server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetCLI = () => {
    setDisplayMessages(INITIAL_MESSAGES.map((m, i) => ({ ...m, id: Date.now() + i })));
    setChatHistory([]);
    setNomination(null);
    setPhase('interviewing');
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Submit a Nomination</h2>
          <p className="text-slate-400 text-lg">
            Peer nominations only — our AI interviewer will help you build a compelling case.
          </p>
        </div>

        <div className="bg-slate-950 rounded-lg shadow-2xl border border-slate-800 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4" />
                <span className="text-sm font-mono">gw-cli</span>
              </div>
            </div>
            <div className="text-xs text-slate-500 font-mono">AI-Powered Interview</div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="bg-slate-950 p-6 font-mono text-sm min-h-[400px] max-h-[550px] overflow-y-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence mode="popLayout">
              {displayMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`mb-1.5 whitespace-pre-wrap ${
                    msg.type === 'system'
                      ? 'text-cyan-400'
                      : msg.type === 'user'
                        ? 'text-green-400'
                        : msg.type === 'error'
                          ? 'text-red-400'
                          : 'text-purple-400'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-cyan-400 mb-1.5"
              >
                thinking...
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex items-start gap-2 mt-3">
              <ChevronRight className="w-4 h-4 text-green-400 shrink-0 mt-1" />
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent outline-none text-green-400 font-mono caret-green-400 resize-none overflow-hidden"
                spellCheck={false}
              />
            </form>
          </div>
        </div>

        <p className="mt-4 text-center text-slate-600 text-sm">
          Click inside the terminal to start your nomination interview
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Calendar Helper ────────────────────────────────── */

function buildGoogleCalendarUrl(title: string, date: string, description: string) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${date}/${date}`,
    details: description,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

function buildIcsBlob(title: string, dateStr: string, description: string) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
}

const TIMELINE_EVENTS = [
  {
    icon: Send,
    title: 'Submissions Close',
    date: 'April 30, 2026',
    calDate: '20260430',
    description: 'All peer nominations must be submitted by this date. Make sure your candidate is in the running.',
    calDescription: 'GW Tech Annual Awards — Nomination deadline. Submit at https://www.joelkarr.com/awards',
    color: 'from-blue-500 to-cyan-500',
    accent: 'blue',
  },
  {
    icon: UserSearch,
    title: 'Meet the Candidates',
    date: 'May 14, 2026',
    calDate: '20260514',
    description: 'Nominees are announced and the interview process begins. Each candidate will go through interviews and have their bios updated on the site.',
    calDescription: 'GW Tech Annual Awards — Candidate announcements and interview process begins.',
    color: 'from-purple-500 to-pink-500',
    accent: 'purple',
  },
  {
    icon: Trophy,
    title: 'Finalists Announced',
    date: 'August 14, 2026',
    calDate: '20260814',
    description: 'After interviews and review, finalists for each award category are revealed with updated bios and achievement highlights.',
    calDescription: 'GW Tech Annual Awards — Finalists announced for all award categories.',
    color: 'from-orange-500 to-amber-500',
    accent: 'orange',
  },
  {
    icon: PartyPopper,
    title: 'Award Ceremony',
    date: 'September 24, 2026',
    calDate: '20260924',
    description: 'Join us to celebrate engineering excellence. Winners are announced and recognized at the inaugural GW Tech Awards ceremony.',
    calDescription: 'GW Tech Annual Awards Ceremony — Winners announced and celebrated.',
    color: 'from-green-500 to-emerald-500',
    accent: 'green',
  },
];

function ProcessTimeline() {
  const [openCalendar, setOpenCalendar] = useState<number | null>(null);

  return (
    <div className="relative py-24 bg-slate-900/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Process</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each nominee goes through an interview process with their bio updated along the way.
            Here are the key dates to know.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-30" />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE_EVENTS.map((event, index) => {
              const Icon = event.icon;
              const isRight = index % 2 === 1;

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Center dot — mobile left, desktop center */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg shadow-${event.accent}-500/25 ring-4 ring-slate-950`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${isRight ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}`}>
                    <div className="relative group bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
                      {/* Connecting line to dot — desktop only */}
                      <div className={`hidden md:block absolute top-6 ${isRight ? '-right-6 w-6' : '-left-6 w-6'} h-0.5 bg-slate-800 group-hover:bg-slate-700 transition-colors`} />

                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-xs font-bold tracking-wide`}>
                          {event.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Add to Calendar */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenCalendar(openCalendar === index ? null : index)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600`}
                        >
                          <CalendarPlus className="w-4 h-4" />
                          Add to Calendar
                        </button>

                        <AnimatePresence>
                          {openCalendar === index && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 bottom-full mb-2 z-20 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden min-w-[200px]"
                            >
                              <a
                                href={buildGoogleCalendarUrl(
                                  `GW Awards: ${event.title}`,
                                  event.calDate,
                                  event.calDescription
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-sm text-slate-300 hover:text-white"
                              >
                                <Calendar className="w-4 h-4 text-blue-400" />
                                Google Calendar
                              </a>
                              <a
                                href={buildIcsBlob(
                                  `GW Awards: ${event.title}`,
                                  event.calDate,
                                  event.calDescription
                                )}
                                download={`gw-awards-${event.title.toLowerCase().replace(/\s+/g, '-')}.ics`}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-sm text-slate-300 hover:text-white border-t border-slate-700"
                              >
                                <CalendarPlus className="w-4 h-4 text-purple-400" />
                                Download .ics
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */

export function AwardsPage() {
  const awardsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'GW Tech Annual Awards 2026',
    description:
      'Peer-nominated awards recognizing innovation, engineering craft, and community building in software engineering.',
    url: 'https://www.joelkarr.com/awards',
    organizer: { '@type': 'Organization', name: 'GW Tech', url: 'https://www.joelkarr.com' },
  };

  return (
    <main id="main-content" className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <SEOHead
        title="GW Tech Annual Awards 2026"
        description="Nominate a peer for the inaugural GW Tech Annual Awards — recognizing innovation, engineering craft, and community building."
        path="/awards"
        jsonLd={awardsJsonLd}
      />

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="absolute right-[5%] top-[10%] opacity-20 hidden lg:block">
          <GlassAward />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Now Accepting Nominations</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent"
            >
              Engineering Excellence
              <br />
              <span className="text-4xl md:text-6xl">Awards 2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto mb-12"
            >
              Nominate exceptional software engineers who are building the future. Celebrate innovation,
              leadership, and technical excellence that inspires our industry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Nominations close April 30, 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Award Categories ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Award Categories</h2>
          <p className="text-slate-400 text-lg">Three categories celebrating different aspects of engineering excellence</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {AWARD_CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 mix-blend-overlay`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    <div className={`absolute top-4 right-4 p-3 rounded-xl bg-gradient-to-br ${cat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold mb-3">
                      {cat.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{cat.title}</h3>
                    <p className="text-sm font-semibold text-slate-400 mb-3">{cat.tagline}</p>
                    <p className="text-slate-300 leading-relaxed mb-6">{cat.description}</p>

                    <div className="space-y-2 pt-4 border-t border-slate-800">
                      <p className="text-sm font-semibold text-slate-400 mb-3">Key Criteria:</p>
                      {cat.criteria.map((criterion, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 text-cyan-500`} />
                          <span className="text-slate-400 text-sm">{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── CLI Nomination ── */}
      <div className="py-20">
        <CLINomination />
      </div>

      {/* ── Process Timeline ── */}
      <ProcessTimeline />
    </main>
  );
}
