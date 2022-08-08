// #21 the user want to do some request
const express = require('express');
const router = express.Router();
const workerController = require('../../controllers/workerController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    // for get, the user need pass the middle ware.
    // #21 we send to verifyRoles the arr of relse_list
    // #22 - verifyRoles.js --> 
    .get(workerController.getAllWorker)
    .post(workerController.createNewWorker)
    .put(workerController.updateWorker)
    .delete(workerController.deleteWorker);

router.route('/:_id')
    .get(workerController.getWorker)
    .delete(workerController.deleteWorker)
    .put(workerController.updateWorker);

router.route('/user/:userId')
    .get(workerController.getWorkerByUserId)
module.exports = router;