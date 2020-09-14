const {Reclamation, validate} = require('../models/reclamation'); 
const {Stagiaire} = require('../models/movie'); 
const {Technicien} = require('../models/technicien'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const reclamations = await Reclamation.find().sort('_id');
  res.send(reclamations);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const stagiaire = await Stagiaire.findById(req.body.customerId);
  if (!stagiaire) return res.status(400).send('Invalid stagiaire.');

  const technicien = await Technicien.findById(req.body.movieId);
  if (!technicien) return res.status(400).send('Invalid technicien.');


  let reclamation = new Reclamation({ 
    stagiaire: {
      _id: stagiaire._id,
      name: customer.name,
      surname: customer.surname, 
      centre: customer.centre, 
      phone: stagiaire.phone
    },
    technicien: {
      _id: technicien._id,
      name: technicien.name,
      surname: technicien.surname, 
    }
  });

  try {
    new Fawn.Task()
      .save('reclamations', reclamation)
      .run();
  
    res.send(reclamation);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', async (req, res) => {
  const reclamation = await Reclamation.findById(req.params.id);

  if (!reclamation) return res.status(404).send('The reclamation with the given ID was not found.');

  res.send(reclamation);
});

module.exports = router; 