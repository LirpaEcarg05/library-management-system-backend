const userModel = require('../models/user_model');
const crypto = require('crypto-js');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await userModel.find();
    } catch (error) {
        console.log(error)
    }
    if (!users) {
        return res.status(404).json({ message: "Unable to find out" })
    }
    return res.status(200).json({ users, message: "Able to found" })

}

const getAllUsersBySchoolId = async (req, res, next) => {
    const schoolId = req.params.id;
    let users;

    try {
        users = await userModel.findOne({schoolId})
    } catch (err) {
        console.log(error)
    }
    if (!users) {   
        return res.status(204).json({ message: 'No users Id' })
    }
    return res.status(200).json({ users,message: 'admin' })
}

const getAllUsersById = async (req, res, next) => {
    const _id = req.params.id;
    let users;

    try {
        users = await userModel.findOne({_id})
    } catch (err) {
        console.log(error)
    }
    if (!users) {   
        return res.status(204).json({ message: 'No users Id' })
    }
    return res.status(200).json({ users, message: 'users' })
}

const addUsers = async (req, res, next) => {
    let users;
    const { schoolId, userType, userFirstName, userMiddleName, userLastName, userCourse, userYear, userDepartment, userImage, bookShelfId, userEmail, userStatus, userRole } = req.body
    const userPassword = crypto.SHA256(req.body.userPassword).toString(crypto.enc.Base64);
    // userPassword.toString(crypto.enc.Base64);
    try {
        users = new userModel({
            schoolId,
            userType,
            userFirstName,
            userMiddleName,
            userLastName,
            userCourse,
            userYear,
            userDepartment,
            userImage,
            bookShelfId,
            userEmail,
            userPassword,
            userStatus,
            userRole

        })
       
        await users.save()
        
        console.log(users)
       
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: 'not add' })
    }
    return res.status(201).json({ users, message: 'Add Successfully' })
}

const updateUsers = async(req,res,next)=>{
    const id = req.params.id
    console.log(req.body)
    console.log(id)
    let users;
    const { schoolId, userType, userFirstName, userMiddleName, userLastName, userCourse, userYear, userDepartment, userImage, bookShelfId, userEmail, userPassword, userStatus, userRole } = req.body
    try{
        users = await userModel.findByIdAndUpdate(id,{
            schoolId,
            userType,
            userFirstName,
            userMiddleName,
            userLastName,
            userCourse,
            userYear,
            userDepartment,
            userImage,
            bookShelfId,
            userEmail,
            userPassword,
            userStatus,
            userRole
        })
        users = await users.save()
        console.log(users)
    }catch(err){
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "Failed" })
    }
    return res.status(200).json({ users, message: "Success update" });
}

const deleteUsers = async(req,res,next)=>{
    const id = req.params.id
    let users;

    try{
        users = await userModel.findByIdAndRemove(id)
    }catch(err){
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({ message: "Unable to delete journal" })
    }
    return res.status(200).json({ message: "Successfully deleted" })

}



exports.getAllUsers = getAllUsers;
exports.getAllUsersById = getAllUsersById;
exports.addUsers = addUsers;
exports.updateUsers = updateUsers;
exports.deleteUsers = deleteUsers;
exports.getAllUsersBySchoolId = getAllUsersBySchoolId;
