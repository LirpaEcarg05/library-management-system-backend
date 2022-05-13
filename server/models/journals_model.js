const mongoose = require('mongoose');

const { Schema } = mongoose;

const journalModel = new Schema({
    articleTitle: {
        type: String,
        default: null
    },
    journalTitle: {
        type: String,
        default: null
    },
    contributorId: {
        type: Schema.Types.ObjectId, ref: 'contributors',
        // type: Array,
        default: null,
    },
    subjectId:{
        // type: Schema.Types.ObjectId, ref: 'main-subjects',
        type: Object,
        default: null,
    },
    categoryId:{
        // type: Schema.Types.ObjectId, ref: 'sub-categories',
        type: Array,
        default: null,
    },
    fromPage: {
        type: String,
        default: null
    },
    toPage: {
        type: String,
        default: null
    },
    volume: {
        type: String,
        default: null
    },
    issue: {
        type: String,
        default: null
    },
    publicationStatus: {
        type: String,
        default: null
    },
    placeOfPublication: {
        type: String,
        default: null
    },
    publicationDate: {
        type: String,
        default: null
    },
    file: {
        type: Object,
        default: null,
    }

})
module.exports = mongoose.model('journal', journalModel)