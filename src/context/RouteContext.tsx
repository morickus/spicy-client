import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface RouteContextProps {
  previousUrl: string;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [previousUrl, setPreviousUrl] = useState<string>('');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setPreviousUrl(window.location.pathname);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RouteContext.Provider value={{ previousUrl }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextProps => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
