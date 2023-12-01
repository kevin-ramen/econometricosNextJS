require("dotenv").config();

// next.config.js
module.exports = {
  webpack(config) { 
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"],
    });
    return config;
  },
};
