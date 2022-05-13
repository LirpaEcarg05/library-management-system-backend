const express = require('express')

const router = express.Router()
const user = require('../controllers/users_controller');
const loginUser = require('../controllers/login_controller');

router.post('/login', loginUser.signin)
router.get('/',user.getAllUsers)
router.get('/userId/:id',user.getAllUsersById)
router.get('/schoolId/:id',user.getAllUsersBySchoolId)
router.post('/',user.addUsers)
router.put('/:id',user.updateUsers)
router.delete('/:id',user.deleteUsers)



module.exports = router;
