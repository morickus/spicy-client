export const ROUTES = {
  ARTICLES: {
    INDEX: '/',
    BY_SLUG: (slug: string) => `/article/${slug}`,
  },
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
};
