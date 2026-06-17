import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  durationMs?: number;
}

export function Toast({ message, visible, onHide, durationMs = 2800 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, durationMs);
    return () => clearTimeout(timer);
  }, [visible, onHide, durationMs]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0e0e14] shadow-[0_0_24px_rgba(0,251,251,0.45)] border border-[#00FBFB]/40 animate-in fade-in slide-in-from-bottom-2"
      style={{ background: 'linear-gradient(135deg, #00FBFB 0%, #00d4d4 100%)' }}
    >
      {message}
    </div>
  );
}
