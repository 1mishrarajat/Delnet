module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://your-backend.com/:path*',
        },
      ];
    },
  };