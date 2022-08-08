
const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUsers)

router.route('/:_id')
    .get(usersController.getUser)
    .delete(usersController.deleteUser)
    // .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser)



module.exports = router;