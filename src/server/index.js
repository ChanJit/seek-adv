process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('babel-core/register');
require('babel-polyfill');

const config = require('./config.localdev');
const serverConfig = require('./serverConfig');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const url = require('url');

global.__devMiddleware = app => {
  require('./webpack').default(app);

  const proxies = [];

  for (const key in config.endpoints) {
    const mount = '/api/' + key;
    const endpointUrl = url.parse(config.endpoints[key]);

    proxies.push({
      mount: mount,
      proxyUrl: config.endpoints[key],
      host: endpointUrl.host,
      port: endpointUrl.port || (endpointUrl.protocol === 'https:' ? 443 : 80)
    });

    config.endpoints[key] = `http://localhost:${8000}${mount}`;
  }

  proxies.forEach(proxy => {
    app.all(proxy.mount + '*', function (req, res) {
      req.url = req.url.substring(proxy.mount.length);
      req.headers.host = proxy.host + ':' + proxy.port;

      apiProxy.web(req, res, { target: proxy.proxyUrl });
    });
  });
};

serverConfig.accessTokenCookie = { name: 'access_token_development' };
serverConfig.refreshTokenCookie = { name: 'refresh_token_development' };

require('./server');
