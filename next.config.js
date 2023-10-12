// const withImages = require("next-images");
// module.exports = withImages({
//     esModule: true,
// });

module.exports = {
    eslint: { ignoreDuringBuilds: true },
    reactStrictMode: true,
    modularizeImports: {
        "@phosphor-icons/react": {
          transform: "@phosphor-icons/react/{{member}}",
        },
      },
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });
        return config;
      },

};
