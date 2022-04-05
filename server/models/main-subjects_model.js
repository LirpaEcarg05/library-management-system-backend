const mongoose = require('mongoose')

const {Schema} = mongoose;

const mainSubjects = new Schema({
    subjectName:{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('main-subjects', mainSubjects)