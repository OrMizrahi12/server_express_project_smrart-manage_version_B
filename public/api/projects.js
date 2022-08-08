const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectConteoller');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(projectController.getAllProjects)
    .post(projectController.createNewProject)


router.route('/:_id')
    .get(projectController.getProject)
    .delete(projectController.deleteProject)
    .put(projectController.updateProject)

router.route('/user/:idManager')
    .get(projectController.getProjectByUserId)
module.exports = router;