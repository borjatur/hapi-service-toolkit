const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');

const serviceToolkit = require('../lib');

const { expect } = Code;
const { it, describe } = exports.lab = Lab.script();

const server = new Hapi.Server();

describe('Toolkit', () => {

  describe('healthcheck', () => {

    it('hapi service registering the plugin should have a healthz endpoint', async () => {
      server.register(serviceToolkit);
      const res = await server.inject({ method: 'GET', url: '/healthz' });
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal('OK');
    });
  });
});