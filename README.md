# hapi-service-toolkit

Hapi plugin adding common functionality to a service

  * /healthz endpoint will be added automatically for service health checking

Example:

```
const serviceToolkit = require('hapi-service-toolkit');
// register the plugin in your hapi service
server.register(serviceToolkit);
````