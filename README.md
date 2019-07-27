# hapi-service-toolkit

Hapi plugin adding common functionality to a service

  * /healthz endpoint will be added automatically for service health checking
  * /metrics endpoint showing a set of different server/process/os metrics

## Getting started

```
npm i --save hapi-service-toolkit
```

Example:

```javascript
const Hapi.server({ load: { sampleInterval: 1000 });

// register the plugin in your hapi service
await server.register({ 
  plugin: require('hapi-service-toolkit'),
  options: {
    metrics: { opsInterval: 2000 }
  }
});
```

## Options

  * metrics //metrics options
    * opsInterval //interval in ms for capturing ops events

## Endpoints

### /healthz

```
OK
```

### /metrics
In order to have a full metrics view, `load.sampleInterval` must be provided at service creation time as well as `metrics.opsInterval` when registering the plugin.

```json
{
  "ops": {
    "host": "<hostname>",
    "osload": [
      2.50537109375,
      3.13525390625,
      3.39306640625
    ],
    "osmem": {
      "total": 8589934592,
      "free": 66142208
    },
    "osup": 604777,
    "psup": 12.483,
    "psmem": {
      "rss": 39243776,
      "heapTotal": 20267008,
      "heapUsed": 12934896,
      "external": 82915
    },
    "pscpu": {
      "user": 333753,
      "system": 127384
    },
    "psdelay": 0.13909301161766052,
    "requests": {
      "<servicePort>": {
        "total": 1,
        "disconnects": 0,
        "statusCodes": {}
      }
    },
    "responseTimes": {
      "<servicePort>": {
        "avg": null,
        "max": 0
      }
    },
    "sockets": {
      "http": {
        "total": 0
      },
      "https": {
        "total": 0
      }
    }
  },
  "load": {
    "eventLoopDelay": 0.7142620086669922,
    "heapUsed": 12946032,
    "rss": 39243776
  }
}
```