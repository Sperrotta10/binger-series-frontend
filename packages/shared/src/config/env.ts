// Cross-environment config:
// - Vite (web): import.meta.env.VITE_API_URL
// - Expo / Node: process.env.EXPO_PUBLIC_API_URL or process.env.VITE_API_URL
function readViteEnv(key: string): string | undefined {
  try {
    return (import.meta as ImportMeta & { env?: Record<string, string> }).env?.[key];
  } catch {
    return undefined;
  }
}

declare var process: { env: Record<string, string | undefined> };

export const env = {
  API_BASE_URL:
    readViteEnv('VITE_API_URL') ||
    (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
    '',
};
