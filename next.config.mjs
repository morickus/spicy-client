import withLinaria from 'next-with-linaria';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
};

export default withLinaria(nextConfig);
