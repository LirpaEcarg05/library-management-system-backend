const mongoose = require('mongoose');

const { Schema } = mongoose;

const contributors = new Schema({
    contributors: {
        type: Array,
        default: null,
    },
   
});

module.exports = mongoose.model('contributors', contributors);