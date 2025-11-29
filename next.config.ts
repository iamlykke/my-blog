const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'lastfm.freetls.fastly.net',
      },
    ],
  },
}

export default nextConfig
