const express = require('express');
const router = express.Router();
const meetingControllers = require('../../controllers/meetingControllers');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(meetingControllers.getAllMeetings)
    .post(meetingControllers.createNewMeeting)


router.route('/:_id')
    .get(meetingControllers.getMeeting)
    .delete(meetingControllers.deleteMeeting)

router.route('/user/:userId')
    .get(meetingControllers.getMeetingByuserId)

module.exports = router;