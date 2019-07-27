'use stric';

const Healthcheck = require('./healthcheck');
const Metrics = require('./metrics');

async function register(server, options = {}) {
  Healthcheck.register(server);
  Metrics.register(server, options.metrics);
}

exports.plugin = {
  register: register,
  pkg: require('../package.json')
}