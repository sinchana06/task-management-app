// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://taskmanagementbackend-saq8.onrender.com', // This should be your backend server URL
      changeOrigin: true,
    })
  );
};
