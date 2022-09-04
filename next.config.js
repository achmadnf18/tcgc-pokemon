const nextPWA = require('next-pwa');

const runtimeCaching = require('./next-pwa.cache');

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svelte/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'svelte-loader-hot',
        },
      ],
    });

    return config;
  },
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.statically.io',
          port: '',
          pathname: '/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
        },
      ],
    },
  },
  async redirects() {
    return [
      {
        source: '/statistics',
        destination: '/statistics/types',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
