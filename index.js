import express from 'express';
import cors from 'cors';
import {getArticleMetaData} from 'article-metadata-extractor';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  const {query} = req;
  if(!query?.url) {
    return res.status(400).send('Should defined query params url');
  }
  getArticleMetaData(query.url)
    .then((data) => res.json({...data, url: query.url}))
    .catch((erro) => res.status(500).send(erro));
});

app.listen(3000, () => console.log('running'));