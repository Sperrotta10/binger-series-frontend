import { CheckCircle2, XCircle } from 'lucide-react';

interface AuthFieldHintProps {
  ok: boolean;
  text: string;
}

export const AuthFieldHint = ({ ok, text }: AuthFieldHintProps) => (
  <span
    className="flex items-center gap-1.5"
    style={{ fontSize: '0.72rem', color: ok ? '#00fbfb' : '#bec7d6' }}
  >
    {ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
    {text}
  </span>
);
