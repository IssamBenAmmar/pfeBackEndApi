const Joi = require('joi');
const mongoose = require('mongoose');

const Stagiaire = mongoose.model('Stagiaire', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  surname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  centre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  contact: {
    type: new mongoose.Schema({
        phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          },
          adresse: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          } 
    })
  },
}));

function validateStagiaire(stagiaire) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    surname: Joi.string().min(5).max(50).required(),
    centre: Joi.string().min(5).max(50).required(),
    
    
  };

  return Joi.validate(stagiaire, schema);
}

exports.Stagiaire = Stagiaire; 
exports.validate = validateStagiaire;