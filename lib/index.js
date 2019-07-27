'use stric';

const Healthcheck = require('./healthcheck');
const Metrics = require('./metrics');
const Logging = require('./logging');

async function register(server, options = {}) {
  const { serviceName = 'service' } = options;
  server.app.serviceName = serviceName;
  Healthcheck.register(server);
  Metrics.register(server, options.metrics);
  Logging.register(server, options.logging);
}

exports.plugin = {
  register: register,
  pkg: require('../package.json')
}