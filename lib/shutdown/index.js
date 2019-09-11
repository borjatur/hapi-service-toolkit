function gracefulShutdown(server) {
  await server.stop({ timeout: 1000 });
  process.exit();
}

async function register(server, options) {
  process.on('unhandledRejection', (err) => {
    //log error
    await server.stop({ timeout: 1000 });
    process.exit(1);
  });

  // quit on ctrl-c when running docker in terminal
  process.on('SIGINT', () => {
    gracefulShutdown(server);
  });

  // quit properly on docker stop
  process.on('SIGTERM', () => {
    gracefulShutdown(server);
  })
}

module.exports = {
  register
}