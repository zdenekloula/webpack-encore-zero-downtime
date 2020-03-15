1. Add plugin

```
yarn add webpack-encore-zero-downtime
```


2. Add plugin to your webpack config (webpack.config.js)

```
const ZeroDowntime = require("webpack-encore-zero-downtime")
```

3. Init plugin

```
...
if (Encore.isProduction()) {
  Encore.addPlugin(new ZeroDowntime(Encore))
}
...
```


