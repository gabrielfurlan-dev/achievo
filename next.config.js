// const withImages = require("next-images");
// module.exports = withImages({
//     esModule: true,
// });

module.exports = {
    experimental: {
        optimizePackageImports: ["@phosphor-icons/react"]
      },
    eslint: { ignoreDuringBuilds: true },
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};
