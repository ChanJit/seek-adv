import StatsD from 'node-statsd';
import config from '../config';

const { statsDHost, appName } = config;

export default logger => {
  const client = new StatsD({
    host: statsDHost,
    prefix: `${appName}.`,
    mock: !statsDHost // Assume mock if not defined
  });

  const getRequestMetricName = req => {
    if (!req.route) {
      return null;
    }

    const name = req.route.path
      .split('/')
      .filter(segment => segment && segment.indexOf(':') < 0)
      .join('.');

    return `http.${req.method}.${name}`.toLowerCase();
  };

  const requestCounter = req => {
    const metric = getRequestMetricName(req);

    if (metric) {
      client.increment(metric);
    }
  };

  const requestTime = req => {
    const metric = getRequestMetricName(req);

    if (metric) {
      const totalTime = new Date().getTime() - req.time();

      client.timing(metric, totalTime);
    }
  };

  const requestStatus = (req, res) => {
    client.increment(`${getRequestMetricName(req)}.status_code.${res.statusCode}`);
  };

  client.socket.on('error', error => logger.error('Error in socket: ', error));

  return {
    requestCounter,
    requestTime,
    requestStatus
  };
};
