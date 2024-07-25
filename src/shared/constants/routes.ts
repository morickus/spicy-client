export const ROUTES = {
  ARTICLES: {
    INDEX: '/',
    BY_SLUG: (slug: string) => `/article/${slug}`,
    BY_CATEGORY: (slug: string) => `/category/${slug}`,
  },
};
