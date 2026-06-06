export const getEnv = (key: string): string | undefined => {
  // Support for React Native/Expo or Node environments (process.env)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  
  // Support for Vite (import.meta.env)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    // @ts-ignore
    return import.meta.env[key];
  }
  
  return undefined;
};

export const config = {
  get API_BASE_URL() {
    return (
      getEnv('VITE_API_BASE_URL') ||
      getEnv('EXPO_PUBLIC_API_BASE_URL') ||
      getEnv('API_BASE_URL') ||
      'http://localhost:3000'
    );
  },
  get isProduction() {
    const env = getEnv('NODE_ENV') || getEnv('VITE_USER_NODE_ENV');
    return env === 'production';
  }
};
