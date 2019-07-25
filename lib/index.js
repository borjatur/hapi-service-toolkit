'use stric';

const Healthcheck = require('./healthcheck');

async function register(server, options) {
  Healthcheck.register(server);
}

exports.plugin = {
  register: register,
  pkg: require('../package.json')
}