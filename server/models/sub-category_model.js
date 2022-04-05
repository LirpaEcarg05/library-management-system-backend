const mongoose = require('mongoose')

const {Schema} = mongoose;

const subCategories = new Schema({
    categoryName:{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('sub-categories', subCategories)