# hapi-service-toolkit

Hapi plugin adding common functionality to a service

  * /healthz endpoint will be added automatically for service health checking

## Getting started

```
npm i --save hapi-service-toolkit
```

Example:

```javascript
const serviceToolkit = require('hapi-service-toolkit');
// register the plugin in your hapi service
await server.register(serviceToolkit);
````