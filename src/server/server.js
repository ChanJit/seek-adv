import app from './app';
import serverConfig from './serverConfig';
import logger from './utilities/logger';

try {
  require('babel-polyfill');
} catch (ex) { /* seems to randomly need this */ }

app.listen(serverConfig.port, (error) => {
  if (error) {
    logger.error('server => ', error);
  } else {
    logger.info(`==> 🌎  Listening on port ${serverConfig.port}. Open up http://localhost:${serverConfig.port}/ in your browser.`);
  }
});