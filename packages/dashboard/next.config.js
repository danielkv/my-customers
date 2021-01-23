const path = require('path');

module.exports = {
    distDir: 'build',
    env: {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'AIzaSyA8oUUDhqlPmIE6728FNRteBPZoXQpDEiI',
        NEXT_PUBLIC_AUTH_TOKEN: '5t7AMzHjqiinNcpadkEjrBBrrui9Rr6f',
        NEXT_PUBLIC_AUTH_DOMAIN: 'danielkv.us.auth0.com',
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
