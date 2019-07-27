const Oppsy = require('@hapi/oppsy');

function metricsView(server) {
  return {
    ops: server.app.ops || {},
    load: server.load
  }
}

function registerOpsEvents(server, interval) {
  const oppsy = new Oppsy(server);
  oppsy.on('ops', (data) => {
    server.app.ops = data;
  });
  oppsy.start(interval);
}


async function register(server, options = {}) {
  const { opsInterval } = options;
  if (typeof (opsInterval) === 'number') {
    registerOpsEvents(server, opsInterval);
  }
  server.route({
    method: 'GET',
    path: '/metrics',
    options: {
      validate: {
        query: false
      }
    },
    handler: (request, h) => {
      return metricsView(request.server);
    }
  });
}

module.exports = {
  register
}