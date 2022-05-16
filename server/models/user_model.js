const mongoose = require('mongoose');
const {Schema} = mongoose;

const useSchema = new Schema({
    schoolId:{
        type: String,
        default: null

    },
    userType:{
        type: String,
        default: null,

    },
    userFirstName:{
        type: String,
        default: null,

    },
    userMiddleName:{
        type: String,
        default: null,

    },
    userLastName:{
        type: String,
        default: null,

    },
    userCourse:{
        type: String,
        default: null,

    },
    userYear:{
        type: String,
        default: null,

    },
    userDepartment:{
        type: String,
        default: null,

    },
    userImage:{
        type: String,
        default: null,

    },
    bookShelfId:{
        type: String,
        default: null,
    },
    userEmail:{
        type: String,
        default: null,
    },
    userPassword:{
        type: String,
        default: null,
    },
    userStatus: {
        type: String,
        default: null,
    },
    userSchool: {
        type: String,
        default: null,
    },
    userRole:{
        type: String,
        default: null,
    }


})

module.exports = mongoose.model('users', useSchema);