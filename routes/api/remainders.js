const express = require('express');
const router = express.Router();
const reminderController = require('../../controllers/reminderController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(reminderController.getAllRemainders)
    .post(reminderController.createNewRemainder)


router.route('/:_id')
    .get(reminderController.getRemainder)
    .delete(reminderController.deleteMRemainder)

router.route('/user/:userId')
    .get(reminderController.getRemainderByUserId)
module.exports = router;