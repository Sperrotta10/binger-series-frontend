/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, setAuthToken } from '@binger/shared';
import type { User } from '@binger/shared';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to refresh token silently
        const res = await AuthService.refresh({});
        const accessToken = res.data.tokens.accessToken;
        setAuthToken(accessToken);
        
        // Fetch user profile if refresh succeeded
        const profileRes = await AuthService.getProfile();
        setUser(profileRes.data.user);
      } catch {
        setAuthToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for unauthorized events from interceptor
    const handleUnauthorized = () => {
      setAuthToken(null);
      setUser(null);
      window.location.href = '/auth/login';
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setAuthToken(null);
      setUser(null);
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-surface text-primary">Loading...</div>; // Could be a cooler loader
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
