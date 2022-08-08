const express = require('express');
const router = express.Router();
const ideasController = require('../../controllers/ideasController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(ideasController.getAllIdeas)
    .post(ideasController.createNewIdea)


router.route('/:_id')
    .get(ideasController.getIdea)
    .delete(ideasController.deleteIdea)

router.route('/user/:userId')
    .get(ideasController.getIdeaByIdUser)

module.exports = router;