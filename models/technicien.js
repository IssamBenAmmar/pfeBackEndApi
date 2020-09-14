const Joi = require('joi');
const mongoose = require('mongoose');

const Technicien = mongoose.model('Technicien', new mongoose.Schema({
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
  specialite: {
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

function validateTechnicien(technicien) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    surname: Joi.string().min(5).max(50).required(),
    specialite: Joi.string().min(5).max(50).required(),
    
    
  };

  return Joi.validate(technicien, schema);
}

exports.technicien = technicien; 
exports.validate = validateTechnicien;