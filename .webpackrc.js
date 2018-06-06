import { resolve } from 'path';

export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  alias: {
    assets: resolve(__dirname,"./src/assets"),
    components: resolve(__dirname,"./src/components"),
    utils: resolve(__dirname,"./src/utils"),
    services: resolve(__dirname,"./src/services"),
    models: resolve(__dirname,"./src/models"),
    constans: resolve(__dirname,"./src/constans")
  },
}
