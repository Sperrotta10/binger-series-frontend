import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="min-h-screen w-full flex items-stretch relative overflow-hidden"
      style={{ background: '#121317', fontFamily: "'Hanken Grotesk', sans-serif" }}
    >
      {/* ── Atmospheric background blobs ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: '-180px',
            left: '-120px',
            background: 'radial-gradient(circle, rgba(138,43,226,0.22) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: '-150px',
            right: '38%',
            background: 'radial-gradient(circle, rgba(0,251,251,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: '30%',
            right: '-80px',
            background: 'radial-gradient(circle, rgba(220,184,255,0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ── Left Brand Panel ─────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between flex-1 relative z-10 px-16 py-12"
        style={{ maxWidth: '52%' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group w-fit">
          <div
            className="w-9 h-9 rounded flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #8a2be2, #dcb8ff)',
              boxShadow: '0 0 18px rgba(220,184,255,0.4)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h10M4 18h13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="19" cy="12" r="3" fill="#00fbfb" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '1.35rem',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            SerieLog
          </span>
        </Link>

        {/* Cinematic tagline */}
        <div className="space-y-6">
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontSize: '0.72rem', color: '#00fbfb', fontWeight: 600 }}
            >
              Your Cinematic Command Center
            </p>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Every frame,
              <br />
              every season,
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #dcb8ff 0%, #00fbfb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                perfectly logged.
              </span>
            </h1>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            {['Track series', 'Rate episodes', 'Share activity', 'Curate watchlists'].map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 rounded text-xs font-semibold"
                style={{
                  background: 'rgba(31,31,36,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#bec7d6',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: '0.75rem', color: '#343439' }}>
          © {new Date().getFullYear()} SerieLog · All rights reserved
        </p>
      </div>

      {/* ── Right Form Panel ─────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center relative z-10 px-6 py-12 lg:px-10">
        <div
          className="w-full"
          style={{
            maxWidth: 480,
            background: 'rgba(31,31,36,0.75)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            padding: '48px 40px',
          }}
        >
          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 w-fit">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #8a2be2, #dcb8ff)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#ffffff' }}
            >
              SerieLog
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};
