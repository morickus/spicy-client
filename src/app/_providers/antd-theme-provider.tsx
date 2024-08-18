'use client';

import { ConfigProvider, theme } from 'antd';
import React, { ReactNode } from 'react';

const AntdThemeProvider = ({ children }: { children: ReactNode }) => (
  <ConfigProvider
    wave={{ disabled: true }}
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorPrimary: '#6FFF2B',
        colorLink: '#6FFF2B',
        colorLinkActive: '#6FFF2B',
        colorLinkHover: '#6FFF2B',
      },
      components: {
        Button: {
          primaryColor: '#0A1F32',
          colorTextLightSolid: '#0A1F32',
        },
        Form: {
          itemMarginBottom: 0,
          labelFontSize: 16,
        },
        Input: {
          controlHeightLG: 48,
          controlHeight: 40,
          controlHeightSM: 32,
          paddingBlockLG: 12,
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdThemeProvider;
