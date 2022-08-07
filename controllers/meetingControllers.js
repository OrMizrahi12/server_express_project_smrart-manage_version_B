const Meeting = require('../model/Meeting');

const getAllMeetings = async (req, res) => {
    const meeting = await Meeting.find();
    if (!meeting) return res.status(204).json({ 'message': 'No meeting found...' });
    res.json(meeting);
}

const createNewMeeting = async (req, res) => {
    try {
        const result = await Meeting.create({
            place: req.body.place,
            date: req.body.date,
            time: req.body.time,
            userId:req.body.userId
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}


const deleteMeeting = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'todo Meeting required.' });

    const meeting = await Meeting.findOne({ _id: req.params._id }).exec();
    if (!meeting) {
        return res.status(204).json({ "message": `No meeting matches ID ${req.params._id}.` });
    }
    const result = await meeting.deleteOne(); 
    res.json(result);
}

const getMeeting = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const meeting = await Meeting.findOne({ _id: req.params._id }).exec();
    if (!meeting) {
        return res.status(204).json({ "message": `No meeting matches ID ${req.params._id}.` });
    }
    res.json(meeting);
}

const getMeetingByuserId = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const meeting = await Meeting.find({ userId: req.params.userId });
    if (!meeting) {
        return res.status(204).json({ "message": `No meeting matches ID ${req.params.userId}.` });
    }
    res.json(meeting);
}


module.exports = {
    getAllMeetings,
    createNewMeeting,
    deleteMeeting,
    getMeeting,
    getMeetingByuserId
}