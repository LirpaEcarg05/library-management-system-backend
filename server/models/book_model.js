const mongoose = require('mongoose');
const moment = require('moment')
const { Schema } = mongoose;
// const uniqueValidator = require('mongoose-unique-validator'); 
const books = new Schema({
    bookTitle: {
        type: String,
        default: null,
    },

    contributorId: {
        type: Schema.Types.ObjectId, ref: 'contributors',
        // type: Array,
        default: null,
    },

    bookEdition: {
        type: String,
        default: null,
    },

    bookVolume: {
        type: String,
        default: null,
    },

    bookPublisher: {
        type: String,
        default: null,
    },

    bookPlacePublished: {
        type: String,
        default: null,
    },

    bookPublisherDate: {
        type: String,
        default: null
    },

    categoryId: {
        // type: Schema.Types.ObjectId, ref: 'category',
        type: Array,
        // type: String,
        default: null,
    },
    subjectId: {
        type: Object,
        default: null,
    },
    chapterId: [
        {
            type: Schema.Types.ObjectId, ref: 'chapters',
            //  type: String,
            default: null,
        }
    ],

    bookCoverId: {
        type: Object,
        default: null,
    },
   
   
    // createdAt:{
    //     type: Date

    // },
    // updatedAt:{
    //     type:Date   
    // }
    // timestamps: moment().format('MM/DD/YYYY')

},);


module.exports = mongoose.model('book', books);