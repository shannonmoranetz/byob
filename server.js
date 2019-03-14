import "@babel/polyfill";
import bodyParser from 'body-parser';
import express from 'express';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')}`)
});

app.get('/api/v1/vitamins', async (req, res) => {
  try {
    let vitamins = await database('vitamins').select()
    res.status(200).json(vitamins)
  } catch (error) {
    res.status(500).json({ error })
  }
});

app.get('/api/v1/treatments', async (req, res) => {
  try {
    let treatments = await database('treatments').select()
    res.status(200).json(treatments)
  } catch (error) {
    res.status(500).json({ error })
  }
});

app.get('/api/v1/vitamins/:id', async (request, response) => {
  try {
    let vitamins = await database('vitamins').where('id', request.params.id).select()
    if (vitamins.length) {
      response.status(200).json(vitamins);
    } else {
      response.status(404).json({ error: `No vitamin exists with id ${request.params.id}` });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/treatments/:id', async (request, response) => {
  try {
    let treatments = await database('treatments').where('id', request.params.id).select()
    if (treatments.length) {
      response.status(200).json(treatments);
    } else {
      response.status(404).json({ error: `No treatment data exists with id ${request.params.id}` });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});