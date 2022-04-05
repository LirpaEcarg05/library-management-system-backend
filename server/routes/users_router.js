const express = require('express')

const router = express.Router()
const user = require('../controllers/users_controller')



router.get('/',user.getAllUsers)
router.get('/:id',user.getAllUsersById)
router.post('/',user.addUsers)
router.put('/:id',user.updateUsers)
router.delete('/:id',user.deleteUsers)



module.exports = router;
