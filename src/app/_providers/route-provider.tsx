'use client';

import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface RouteContextProps {
  previousUrl: string;
  currentUrl: string;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [previousUrl, setPreviousUrl] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>(pathname ?? '');

  useEffect(() => {
    if (currentUrl !== pathname) {
      setPreviousUrl(currentUrl);
      setCurrentUrl(pathname ?? '');
    }
  }, [pathname, currentUrl]);

  const value = useMemo(() => ({ previousUrl, currentUrl }), [previousUrl, currentUrl]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
};

export const useRoute = (): RouteContextProps => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};
