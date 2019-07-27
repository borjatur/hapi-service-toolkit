async function register(server, options) {
  server.route({
    method: 'GET',
    path: '/healthz',
    options: {
      validate: {
        query: false
      }
    },
    handler: (request, h) => {
      return 'OK';
    }
  });
}

module.exports = {
  register
}