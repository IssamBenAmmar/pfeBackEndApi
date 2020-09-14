const {Technicien, validate} = require('../models/technicien'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const techniciens = await Technicien.find().sort('name');
  res.send(techniciens);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let technicien = new Technicien({ 
    name: req.body.name,
    surname: req.body.surname,
    contact: req.body.contact
  });
  technicien = await technicien.save();
  
  res.send(technicien);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const technicien = await technicien.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      surname: req.body.surname,
      contact: req.body.contact
    }, { new: true });

  if (!technicien) return res.status(404).send('The technicien with the given ID was not found.');
  
  res.send(technicien);
});

router.delete('/:id', async (req, res) => {
  const technicien = await Ttagiaire.findByIdAndRemove(req.params.id);

  if (!technicien) return res.status(404).send('The technicien with the given ID was not found.');

  res.send(technicien);
});

router.get('/:id', async (req, res) => {
  const technicien = await Technicien.findById(req.params.id);

  if (!technicien) return res.status(404).send('The customer with the given ID was not found.');

  res.send(technicien);
});

module.exports = router; 