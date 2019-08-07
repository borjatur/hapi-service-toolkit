async function register(server, options = {}) {
  if (options.enabled === true) {
    const logger = require('pino')({
      prettyPrint: {
        translateTime: true
      }
    })
    global._poseidonLogger = logger; //sharing logger instance across all app
    await server.register({
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
        instance: logger,
        // Redact Authorization headers, see https://getpino.io/#/docs/redaction
        redact: ['req.headers.authorization'],
        ignorePaths: ['/healthz']
      }
    });
  }
}

module.exports = {
  register
}