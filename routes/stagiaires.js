const {Stagiaire, validate} = require('../models/stagiaire'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const stagiaires = await Stagiaire.find().sort('name');
  res.send(stagiaires);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let stagiaire = new Stagiaire({ 
    name: req.body.name,
    surname: req.body.surname,
    contact: req.body.contact
  });
  stagiaire = await stagiaire.save();
  
  res.send(stagiaire);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const stagiaire = await stagiaire.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      surname: req.body.surname,
      contact: req.body.contact
    }, { new: true });

  if (!stagiaire) return res.status(404).send('The stagiaire with the given ID was not found.');
  
  res.send(stagiaire);
});

router.delete('/:id', async (req, res) => {
  const stagiaire = await Stagiaire.findByIdAndRemove(req.params.id);

  if (!stagiaire) return res.status(404).send('The stagiaire with the given ID was not found.');

  res.send(stagiaire);
});

router.get('/:id', async (req, res) => {
  const stagiaire = await Stagiaire.findById(req.params.id);

  if (!stagiaire) return res.status(404).send('The customer with the given ID was not found.');

  res.send(stagiaire);
});

module.exports = router; 