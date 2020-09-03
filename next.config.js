const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    sw: 'service-worker.js',
  },
  redirects() {
    return [
      {
        source: '/',
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LNG}`,
        permanent: true
      }
    ];
  }
  // other next config
}));
