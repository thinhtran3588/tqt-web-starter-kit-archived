const withPWA = require('next-pwa');
const config = require('./src/core/config.json');

module.exports = withPWA({
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
        destination: `/${config.defaultLng}`,
        permanent: true
      }
    ];
  }
  // other next config
});
