import { RouteProvider } from '@/context/RouteContext';
import { GoogleTagManager } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <div id="app-layout">{children}</div>
        {process.env.NODE_ENV == 'production' && (
          <GoogleTagManager gtmId="GTM-K6JB9R7H" />
        )}
      </RouteProvider>
    </QueryClientProvider>
  );
};

export default AppLayout;
