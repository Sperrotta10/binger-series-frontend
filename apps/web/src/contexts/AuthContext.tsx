/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, restoreAuthToken, setAuthToken, hasAuthToken } from '@binger/shared';
import type { User } from '@binger/shared';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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
        restoreAuthToken();

        if (hasAuthToken()) {
          try {
            const profileRes = await AuthService.getProfile();
            setUser(profileRes.data.user);
            return;
          } catch {
            setAuthToken(null);
          }
        }

        const res = await AuthService.refresh({});
        setAuthToken(res.data.tokens.accessToken);

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

    const handleUnauthorized = () => {
      setAuthToken(null);
      setUser(null);
      if (!window.location.pathname.startsWith('/auth/')) {
        window.location.href = '/auth/login';
      }
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  useEffect(() => {
    let refreshInterval: ReturnType<typeof setInterval> | null = null;

    if (user) {
      refreshInterval = setInterval(async () => {
        try {
          const res = await AuthService.refresh({});
          setAuthToken(res.data.tokens.accessToken);
        } catch {
          // Interceptor handles session expiry on the next protected request.
        }
      }, 10 * 60 * 1000);
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [user]);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        setUser,
      }}
    >
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
