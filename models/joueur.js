'use strict';
/* Mongo */
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        default: ''
    },
    score: {
        type: String,
        required: true,
        default: ''
    },
    temps: {
        type: String,
        required: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    }
});
module.exports = mongoose.model('Joueur', schema);