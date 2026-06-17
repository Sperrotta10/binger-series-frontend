import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Radio } from 'lucide-react';

const STREAM_LOGS = [
  'Establishing handshake with TV Maze node…',
  'Syncing catalog layers via BullMQ…',
  'Ingesting seasons & episodes into Binger core…',
  'Generating AI summaries & poster assets…',
  'Finalizing local catalog index…',
] as const;

interface IngestionModalProps {
  title: string;
  phase: 'syncing' | 'done' | 'error';
}

export const IngestionModal: React.FC<IngestionModalProps> = ({ title, phase }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    if (phase !== 'syncing') return;

    setTimeout(() => {
      setLogIndex(0);
      setProgress(8);
    }, 0);

    const logTimer = setInterval(() => {
      setLogIndex((i) => (i + 1) % STREAM_LOGS.length);
    }, 2800);

    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 92 ? 92 : p + Math.random() * 6 + 2));
    }, 1200);

    return () => {
      clearInterval(logTimer);
      clearInterval(progressTimer);
    };
  }, [phase, title]);

  useEffect(() => {
    if (phase === 'done') setTimeout(() => setProgress(100), 0);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#121317]/80 backdrop-blur-md p-4">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10
                   bg-[#1F1F24]/90 backdrop-blur-xl shadow-[0_0_80px_rgba(220,184,255,0.12)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#00FBFB]/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative flex flex-col items-center gap-6 px-8 py-10 text-center">
          {phase === 'syncing' && (
            <>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping [animation-duration:2.5s]" />
                <div className="absolute inset-3 rounded-full border border-[#00FBFB]/20 animate-spin [animation-duration:4s]" />
                <div className="absolute inset-6 rounded-full bg-[#1F1F24] border border-white/10 flex items-center justify-center">
                  <Loader2 size={28} className="text-primary animate-spin" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Radio size={12} className="text-[#00FBFB] animate-pulse" />
                  <p className="text-[10px] font-bold text-[#00FBFB] uppercase tracking-[0.25em]">
                    Live Data Stream
                  </p>
                </div>
                <h3 className="text-white font-headline-md text-xl leading-snug">
                  Importing universe
                </h3>
                <p className="text-on-surface-variant text-sm">
                  Pulling <span className="text-white font-semibold">{title}</span> into Binger
                </p>
              </div>

              <div className="w-full space-y-2">
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-[#c084fc] to-[#00FBFB] transition-all duration-700 ease-out"
                    style={{ width: `${progress}%`, boxShadow: '0 0 12px rgba(220,184,255,0.5)' }}
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/70 tabular-nums">{Math.round(progress)}%</p>
              </div>

              <div className="w-full rounded-lg border border-white/5 bg-black/20 px-4 py-3 text-left">
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider mb-1.5">
                  Transmission log
                </p>
                <p
                  key={logIndex}
                  className="text-xs text-on-surface-variant font-mono leading-relaxed opacity-90"
                >
                  <span className="text-[#00FBFB]">&gt;</span> {STREAM_LOGS[logIndex]}
                </p>
              </div>
            </>
          )}

          {phase === 'done' && (
            <>
              <CheckCircle2
                size={56}
                className="text-green-400 drop-shadow-[0_0_16px_rgba(74,222,128,0.45)]"
              />
              <div>
                <h3 className="text-white font-headline-md text-lg mb-1">Catalog synced</h3>
                <p className="text-on-surface-variant text-sm">
                  <span className="text-white font-semibold">{title}</span> is ready — opening details…
                </p>
              </div>
              <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-full bg-green-400/80 rounded-full" />
              </div>
            </>
          )}

          {phase === 'error' && (
            <>
              <AlertCircle size={56} className="text-red-400" />
              <div>
                <h3 className="text-white font-headline-md text-lg mb-1">Import failed</h3>
                <p className="text-on-surface-variant text-sm">
                  Could not sync <span className="text-white font-semibold">{title}</span>. Try again later.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
