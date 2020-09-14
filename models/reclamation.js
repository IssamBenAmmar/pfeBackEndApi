const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  stagiaire: { 
    type: new mongoose.Schema({
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
      }      
    })},
    technicien: { 
        type: new mongoose.Schema({
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
          }      
        })},
  etat: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  noteStagiaire: { 
    type: Text, 
    required: true,
    min: 0,
    max: 500
  },
  noteTechnicien: { 
    type: Text, 
    required: true,
    min: 0,
    max: 500
  }
}));

function validateReclamation(reclamation) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    stagiaireId: Joi.objectId().required(),
    technicienId: Joi.objectId().required(),
    etat: Joi.number().min(0).required(),
    noteStagiaire: Joi.string().min(5).max(500).required(),
    noteTechnicien: Joi.string().min(5).max(500).required(),
  };

  return Joi.validate(reclamation, schema);
}

exports.Reclamation = Reclamation; 
exports.validate = validateReclamation;