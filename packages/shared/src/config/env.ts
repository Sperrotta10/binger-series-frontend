// Cross-environment config:
// - Vite (web): process.env is polyfilled via `define: { 'process.env': {} }` in vite.config.ts
// - Expo / Node: process.env exists natively
export const env = {
  API_BASE_URL:
    (typeof process !== 'undefined' && process.env?.VITE_API_URL) ||
    (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) ||
    'http://localhost:3000',
};
