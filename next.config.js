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
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};
