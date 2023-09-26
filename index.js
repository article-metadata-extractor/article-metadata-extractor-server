import express from 'express';
import cors from 'cors';
import {getArticleMetaData} from 'article-metadata-extractor';
import swagger from 'swagger-ui-express';

const app = express();

app.use(cors());

const docs = {
  openapi: '3.0.0',
  paths: {
    "/": {
      "get": {
        "tags": ["Extractor"],
        "summary": "",
        "description": "",
        "parameters": [
          {
            "name": "url",
            "in": "query",
            "description": "Article's URL you want to extract some data",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uri"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Ok",
            "content": {
              "application/json": {
                "example": {
                  "image": "https://www.designyourway.net/blog/wp-content/uploads/2015/03/XJbzrO.jpg",
                  "title": "116 Cool CSS Text Effects Examples That You Can Download",
                  "author": "Bogdan Sandu",
                  "tags": [],
                  "publicationDate": "2023-04-19T11:00:12.000Z",
                  "readTime": 29,
                  "description": "You came here for some really cool CSS text effects that will help you make amazing web typography for your websites.",
                  "url": "https://www.designyourway.net/blog/yes-you-can-actually-make-these-text-effects-in-css/?utm_source=pocket_saves"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "example": {
                  "error": "Invalid URL"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "example": {
                  "error": "Ocorreu um erro interno"
                }
              }
            }
          }
        }
      }
    }
  },
};

app.use('/docs', swagger.serve, swagger.setup(docs))

app.get('/', (req, res) => {
  const {query} = req;
  if(!query?.url) {
    const error = 'Should defined query params url';
    return res.status(400).send({error});
  }
  getArticleMetaData(query.url)
    .then((data) => res.json({...data, url: query.url}))
    .catch((error) => res.status(500).send({error}));
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`running at ${port}`));