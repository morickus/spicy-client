export const ROUTES = {
  ARTICLES: {
    INDEX: '/',
    BY_SLUG: (slug: string) => `/article/${slug}`,
    BY_CATEGORY: (slug: string) => `/category/${slug}`,
  },
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
};
