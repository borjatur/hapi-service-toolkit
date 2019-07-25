async function register(server, options) {
  server.route({
    method: 'GET',
    path: '/healthz',
    options: {
      validate: {
        query: false,
        failAction: async (request, h, err) => { throw err; }
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