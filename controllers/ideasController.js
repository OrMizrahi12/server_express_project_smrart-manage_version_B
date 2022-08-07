const Idea = require('../model/Idea');

const getAllIdeas = async (req, res) => {
    const idea = await Idea.find();
    if (!idea) return res.status(204).json({ 'message': 'No todo found...' });
    res.json(idea);
}

const createNewIdea = async (req, res) => {
    const { idea,userId } = req.body;
    let arr = []

    if (!idea ||!userId) {
        arr.push('idea')
        arr.push('userId')
        return res.status(400).json({ 'you must fill:': arr });
    }

    try {
        const result = await Idea.create({
            idea: req.body.idea,
            userId: req.body.userId
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}


const deleteIdea = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'todo ID required.' });

    const idea = await Idea.findOne({ _id: req.params._id }).exec();
    if (!idea) {
        return res.status(204).json({ "message": `No idea matches ID ${req.params._id}.` });
    }
    const result = await idea.deleteOne(); 
    res.json(result);
}

const getIdea = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const idea = await Idea.findOne({ _id: req.params._id }).exec();
    if (!idea) {
        return res.status(204).json({ "message": `No idea matches ID ${req.params._id}.` });
    }
    res.json(idea);
}

const getIdeaByIdUser = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const idea = await Idea.find({ userId: req.params.userId });
    if (!idea) {
        return res.status(204).json({ "message": `No idea matches ID ${req.params.userId}.` });
    }
    res.json(idea);
}

module.exports = {
    getAllIdeas,
    createNewIdea,
    deleteIdea,
    getIdea,
    getIdeaByIdUser
}