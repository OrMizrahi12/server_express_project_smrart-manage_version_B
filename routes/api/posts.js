const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(postController.getAllPosts)
    .post( postController.createNewPost)
    .put(postController.updatePost)
    .delete( postController.deletePost);

router.route('/:_id')
    .get(postController.getPost)
    .delete(postController.deletePost)
    .put(postController.updatePost);

router.route('/user/:userId')   

.get(postController.getPostByUserId)
module.exports = router;