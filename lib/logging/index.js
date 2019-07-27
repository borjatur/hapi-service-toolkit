async function register(server, options = {}) {
  const { loggingPath = `${server.app.serviceName}.json` } = options;
  const fileLogger = require('pino')(loggingPath);
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: process.env.NODE_ENV !== 'production',
      instance: fileLogger,
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization']
    }
  });
}

module.exports = {
  register
}