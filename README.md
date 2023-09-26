# Article Metadata Extractor Server

HTTP Server in Node.js to provide an API to return the result of [Article Metadata Extractor](https://github.com/mathiasgheno/article-metadata-extractor/). 

### Usage

Install all dependencies, this should be fast. 

```shell
npm install
```

After that you can start the server throught that:

```shell
npm run start
```

The default port is `3000`. If you want to run it in other port you can define the `PORT` environment variable. 

```shell
PORT=3008 npm run start
```

### Docs

You can access the path `/docs` to get access to Swagger Docs.