const Meeting = require('../model/Meeting');
const Remainder = require('../model/Remainder');

const getAllRemainders = async (req, res) => {
    const remainder = await Remainder.find();
    if (!remainder) return res.status(204).json({ 'message': 'No remainder found...' });
    res.json(remainder);
}

const createNewRemainder = async (req, res) => {
    const { remainder ,userId} = req.body;
    let arr = []

    // if (!remainder) {
    //     arr.push('remainder')
    //     arr.push('userId')
    //     return res.status(400).json({ 'you must fill:': arr });
    // }

    try {
        const result = await Remainder.create({
            remainder: req.body.remainder,
            userId: req.body.userId
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}


const deleteMRemainder = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'todo ID required.' });

    const remainder = await Remainder.findOne({ _id: req.params._id }).exec();
    if (!remainder) {
        return res.status(204).json({ "message": `No Remainder matches ID ${req.params._id}.` });
    }
    const result = await Remainder.deleteOne(); 
    res.json(result);
}

const getRemainder = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const remainder = await Remainder.findOne({ _id: req.params._id }).exec();
    if (!remainder || remainder == false) {
        return res.status(204).json({ "message": `No remainder matches ID ${req.params._id}.` });
    }
    res.json(remainder);
}

const getRemainderByUserId = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const remainder = await Remainder.find({ userId: req.params.userId });
    if (!remainder) {
        return res.status(204).json({ "message": `No remainder matches ID ${req.params.userId}.` });
    }
    res.json(remainder);
}
module.exports = {
    getAllRemainders,
    createNewRemainder,
    deleteMRemainder,
    getRemainder,
    getRemainderByUserId
}