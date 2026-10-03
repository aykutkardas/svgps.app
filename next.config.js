/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Account-based collections and login were removed; keep old links working.
      {
        source: "/collection/:id",
        destination: "/collection",
        permanent: true,
      },
      {
        source: "/auth-redirect",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
