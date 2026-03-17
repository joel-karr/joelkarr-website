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
  UserPlus,
  FileText,
  CheckCircle,
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

const PROCESS_STEPS = [
  {
    icon: UserPlus,
    title: 'Select a Nominee',
    description: 'Identify an exceptional software engineer whose work deserves recognition.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Complete the Form',
    description: 'Provide details about their achievements, impact, and why they should be recognized.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: CheckCircle,
    title: 'Submit & Review',
    description: 'Our panel will review all nominations and select award recipients.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    title: 'Celebrate Excellence',
    description: 'Winners will be announced and celebrated at our awards ceremony.',
    color: 'from-orange-500 to-red-500',
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

const CLI_AWARDS = [
  { num: 1, name: 'Innovator of the Year', key: 'innovator' },
  { num: 2, name: 'The Craft Award', key: 'craft' },
  { num: 3, name: 'Community Builder of the Year', key: 'community-builder' },
];

const QUESTIONS: { key: string; field: string; prompt: string }[] = [
  { key: 'nomineeName', field: 'nomineeName', prompt: "What is the nominee's full name?" },
  { key: 'nomineeRole', field: 'nomineeRole', prompt: 'What is their role and company?' },
  { key: 'nominatorName', field: 'nominatorName', prompt: 'What is your name?' },
  { key: 'nominatorEmail', field: 'nominatorEmail', prompt: 'What is your email address?' },
  { key: 'justification', field: 'justification', prompt: 'Why does this person deserve the award? (min 50 chars)' },
];

function CLINomination() {
  const [messages, setMessages] = useState<CLIMessage[]>([
    { type: 'system', text: 'GW CLI v1.0.0 — Goat Wranglers Engineering Awards', id: 0 },
    { type: 'system', text: '────────────────────────────────────────────────────', id: 1 },
    { type: 'prompt', text: 'Which award would you like to nominate someone for?', id: 2 },
    { type: 'system', text: '  1. Innovator of the Year\n  2. The Craft Award\n  3. Community Builder of the Year', id: 3 },
  ]);

  const [input, setInput] = useState('');
  const [step, setStep] = useState<'award' | 'questions' | 'confirm' | 'done'>('award');
  const [selectedAward, setSelectedAward] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessages = (...msgs: Omit<CLIMessage, 'id'>[]) => {
    setMessages((prev) => [
      ...prev,
      ...msgs.map((m, i) => ({ ...m, id: Date.now() + i })),
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || isSubmitting) return;

    addMessages({ type: 'user', text: `> ${value}` });
    setInput('');

    if (step === 'award') {
      const num = parseInt(value);
      const award = CLI_AWARDS.find((a) => a.num === num);
      if (!award) {
        addMessages({ type: 'error', text: 'Please enter 1, 2, or 3.' });
        return;
      }
      setSelectedAward(award.key);
      setTimeout(() => {
        addMessages(
          { type: 'system', text: `\n> Selected: ${award.name}\n` },
          { type: 'prompt', text: QUESTIONS[0].prompt }
        );
        setStep('questions');
        setQuestionIndex(0);
      }, 200);
    } else if (step === 'questions') {
      const q = QUESTIONS[questionIndex];

      if (q.key === 'nominatorEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        addMessages({ type: 'error', text: 'Please enter a valid email address.' });
        return;
      }
      if (q.key === 'justification' && value.length < 50) {
        addMessages({ type: 'error', text: `Need at least 50 characters (currently ${value.length}).` });
        return;
      }

      const next = { ...formData, [q.field]: value };
      setFormData(next);

      if (questionIndex < QUESTIONS.length - 1) {
        setTimeout(() => {
          addMessages({ type: 'prompt', text: QUESTIONS[questionIndex + 1].prompt });
          setQuestionIndex(questionIndex + 1);
        }, 200);
      } else {
        const awardLabel = CLI_AWARDS.find((a) => a.key === selectedAward)?.name ?? selectedAward;
        setTimeout(() => {
          addMessages(
            { type: 'system', text: '\n────────────────────────────────────────────────────' },
            { type: 'system', text: 'Review your nomination:\n' },
            { type: 'system', text: `  Award:    ${awardLabel}` },
            { type: 'system', text: `  Nominee:  ${next.nomineeName}` },
            { type: 'system', text: `  Role:     ${next.nomineeRole}` },
            { type: 'system', text: `  Your name: ${next.nominatorName}` },
            { type: 'system', text: `  Email:    ${next.nominatorEmail}` },
            { type: 'system', text: '\n────────────────────────────────────────────────────' },
            { type: 'prompt', text: 'Type "submit" to send or "restart" to start over.' }
          );
          setStep('confirm');
        }, 200);
      }
    } else if (step === 'confirm') {
      if (value.toLowerCase() === 'submit') {
        setIsSubmitting(true);
        try {
          const res = await fetch('/api/nominations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ award: selectedAward, ...formData }),
          });
          const data = await res.json();
          if (!res.ok) {
            addMessages({ type: 'error', text: data.error || 'Submission failed. Try again.' });
          } else {
            addMessages(
              { type: 'system', text: '\nNomination submitted successfully!' },
              { type: 'system', text: 'Thank you for recognizing engineering excellence.' },
              { type: 'prompt', text: '\nType "new" to submit another nomination.' }
            );
            setStep('done');
          }
        } catch {
          addMessages({ type: 'error', text: 'Could not reach the server. Please try again.' });
        } finally {
          setIsSubmitting(false);
        }
      } else if (value.toLowerCase() === 'restart') {
        resetCLI();
      }
    } else if (step === 'done') {
      if (value.toLowerCase() === 'new') {
        resetCLI();
      }
    }
  };

  const resetCLI = () => {
    setMessages([
      { type: 'system', text: 'GW CLI v1.0.0 — Goat Wranglers Engineering Awards', id: Date.now() },
      { type: 'system', text: '────────────────────────────────────────────────────', id: Date.now() + 1 },
      { type: 'prompt', text: 'Which award would you like to nominate someone for?', id: Date.now() + 2 },
      { type: 'system', text: '  1. Innovator of the Year\n  2. The Craft Award\n  3. Community Builder of the Year', id: Date.now() + 3 },
    ]);
    setStep('award');
    setSelectedAward('');
    setQuestionIndex(0);
    setFormData({});
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
            Peer nominations only — recognize someone whose work deserves it.
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
            <div className="text-xs text-slate-500 font-mono">Goat Wranglers Tech</div>
          </div>

          {/* Terminal Body */}
          <div
            className="bg-slate-950 p-6 font-mono text-sm min-h-[400px] max-h-[550px] overflow-y-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
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

            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
              <ChevronRight className="w-4 h-4 text-green-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 bg-transparent outline-none text-green-400 font-mono caret-green-400"
                autoFocus
                spellCheck={false}
              />
            </form>
            <div ref={endRef} />
          </div>
        </div>

        <p className="mt-4 text-center text-slate-600 text-sm">
          Click inside the terminal to start your nomination
        </p>
      </motion.div>
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

      {/* ── How to Nominate ── */}
      <div className="relative py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Nominate</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The nomination process is simple and quick. Help us recognize outstanding engineering talent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((s, index) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-slate-700 to-transparent z-0" />
                  )}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 group">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center">
                      <span className="text-sm font-bold text-cyan-400">{index + 1}</span>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CLI Nomination ── */}
      <div className="py-20">
        <CLINomination />
      </div>
    </main>
  );
}
