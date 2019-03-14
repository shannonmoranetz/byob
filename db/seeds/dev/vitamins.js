const vitaminsData = require('../../data/vitamins');
const treatmentsData = require('../../data/treatments');

exports.seed = (knex, Promise) => {
  return knex('treatments').del()
    .then(() => knex('vitamins').del())
    .then(() => {
      let treatmentPromises = [];
      treatmentsData.forEach(treatment => {
        treatmentPromises.push(createTreatment(knex, treatment));
      });
      return Promise.all(treatmentPromises);
    })
    .then(() => {
      let vitaminPromises = [];
      vitaminsData.forEach(vitamin => {
        vitaminPromises.push(createVitamin(knex, vitamin));
      });
      return Promise.all(vitaminPromises);
    })
    .catch(error => console.log(`Seeding error: ${error}`));
};

const createVitamin = (knex, vitamin) => {
  return knex('vitamins').insert({
    name: vitamin.name,
    treatment_id: vitamin.treatmentID
  }, 'id')
};

const createTreatment = (knex, treatment) => {
  return knex('treatments').insert({
    uses: treatment.uses,
    side_effects: treatment.side_effects
  }, 'id')
};