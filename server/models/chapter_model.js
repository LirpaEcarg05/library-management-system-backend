const mongoose = require('mongoose')

const {Schema} = mongoose;

const chapters = new Schema({
    chapterTitle:{
        type: String,
        default: null
    },
    chapterFile:{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('chapters', chapters);