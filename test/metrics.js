const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');

const serviceToolkit = require('../lib');
const { wait } = require('./util')

const { expect } = Code;
const { it, describe, before, after } = exports.lab = Lab.script();

describe('Toolkit', () => {

  describe('metrics', () => {

    describe('happy path', () => {
      const server = new Hapi.Server({ load: { sampleInterval: 100 } });

      before(async () => {
        await server.start();
        await server.register({ plugin: serviceToolkit, options: { metrics: { opsInterval: 100 } } });
        await wait(110); //allow the service to catch first load and ops events
      });
      after(async () => {
        await server.stop();
      });

      it('should return ops metrics', async () => {
        const res = await server.inject({ method: 'GET', url: '/metrics' });
        const { ops } = res.result;

        expect(res.statusCode).to.equal(200);
        expect(ops.host).to.exist();
        expect(ops.osload).to.be.an.array();
        expect(ops.osmem.total).to.exist();
        expect(ops.osmem.free).to.exist();
        expect(ops.osup).to.exist();
        expect(ops.psup).to.exist();
        expect(ops.psmem.rss).to.exist();
        expect(ops.psmem.heapTotal).to.exist();
        expect(ops.psmem.heapUsed).to.exist();
        expect(ops.psmem.external).to.exist();
        expect(ops.pscpu.user).to.exist();
        expect(ops.pscpu.system).to.exist();
        expect(ops.psdelay).to.exist();
        expect(ops.requests[server.info.port].total).to.exist();
        expect(ops.requests[server.info.port].disconnects).to.exist();
        expect(ops.requests[server.info.port].statusCodes).to.be.an.object();
        expect(ops.responseTimes).to.be.an.object();
        expect(ops.sockets).to.be.an.object();
      });

      it('should return load metrics', async () => {
        const res = await server.inject({ method: 'GET', url: '/metrics' });
        const { load } = res.result;

        expect(res.statusCode).to.equal(200);
        expect(load.eventLoopDelay).not.to.equal(0);
        expect(load.heapUsed).not.to.equal(0);
        expect(load.rss).not.to.equal(0);
      });
    });

    describe('missing load options', () => {
      const server = new Hapi.Server();

      before(async () => {
        await server.start();
        await server.register({ plugin: serviceToolkit });
      });
      after(async () => {
        await server.stop();
      });

      it('should return 0 in all load metric values', async () => {
        const res = await server.inject({ method: 'GET', url: '/metrics' });
        const { load } = res.result;

        expect(res.statusCode).to.equal(200);
        expect(load).to.equal({ eventLoopDelay: 0, heapUsed: 0, rss: 0 });
      });
    });

    describe('missing metrics options', () => {
      const server = new Hapi.Server({ load: { sampleInterval: 1000 } });

      before(async () => {
        await server.register({ plugin: serviceToolkit });
        await server.start();
      });
      after(async () => {
        await server.stop();
      });

      it('should return empty object in ops metrics', async () => {
        const res = await server.inject({ method: 'GET', url: '/metrics' });
        const { ops } = res.result;

        expect(res.statusCode).to.equal(200);
        expect(ops).to.be.empty();
      });
    });
  });
});