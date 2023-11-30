require('dotenv').config();

// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      // Solamente ejecutar la configuración en el lado del cliente (client-side)
      if (!isServer) {
        config.module.rules.push({
          test: /\.geojson$/,
          type: 'javascript/auto', // Configuración para cargar archivos JSON/GeoJSON
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            },
          ],
        });
      }
  
      return config;
    },
  };
  