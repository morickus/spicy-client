'use client';

import { ThemeProvider } from '@emotion/react';
import { theme } from 'antd';
import type { ComponentTokenMap } from 'antd/es/theme/interface';
import type { AliasToken as DefaultAliasToken } from 'antd/es/theme/interface/alias';
import React, { ReactNode } from 'react';

declare module '@emotion/react' {
  export interface Theme {
    token: ThemeToken;
  }
}

export interface ThemeToken extends Partial<DefaultAliasToken & ComponentTokenMap> {
  //Customs theme params
}

const EmotionThemeProvider = ({ children }: { children: ReactNode }) => {
  const token = theme.useToken();

  return <ThemeProvider theme={token}>{children}</ThemeProvider>;
};

export default EmotionThemeProvider;
