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

app.get('/api/v1/vitamins/:id', async (req, res) => {
  try {
    let vitamins = await database('vitamins').where('id', req.params.id).select()
    if (vitamins.length) {
      res.status(200).json(vitamins);
    } else {
      res.status(404).json({ error: `No vitamin exists with id ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/api/v1/treatments/:id', async (req, res) => {
  try {
    let treatments = await database('treatments').where('id', req.params.id).select()
    if (treatments.length) {
      res.status(200).json(treatments);
    } else {
      res.status(404).json({ error: `No treatment data exists with id ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/vitamins', async (req, res) => {
  try {
    const vitamin = req.body;
    for (let requiredParameter of ['name', 'treatment_id']) {
      if (!vitamin[requiredParameter]) {
        return res.status(422)
          .send({ error: `Expected format: { name: <String>, treatment_id: <Number> }. You're missing a "${requiredParameter}" property.` });
      }
    }
    let result = await database('vitamins').insert(vitamin, 'id')
    res.status(201).json({ id: result[0] })
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/treatments', async (req, res) => {
  try {
    const treatment = req.body;
    for (let requiredParameter of ['uses', 'side_effects']) {
      if (!treatment[requiredParameter]) {
        return res.status(422)
          .send({ error: `Expected format: { uses: <String>, side_effects: <String> }. You're missing a "${requiredParameter}" property.` });
      }
    }
    let result = await database('treatments').insert(treatment, 'id')
    res.status(201).json({ id: result[0] })
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete('/api/v1/vitamins/:id', async (req, res) => {
  try {
    let vitamins = await database('vitamins').where('id', req.params.id).select()
    if (vitamins.length) {
      await database('vitamins').where('id', req.params.id).del();
      res.status(204).json({ Success: `Deleted vitamin with id ${req.params.id}` });
    } else {
      res.status(404).json({ error: `No vitamin exists with id ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});