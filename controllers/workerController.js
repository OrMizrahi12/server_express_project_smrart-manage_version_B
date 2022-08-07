const Worker = require('../model/Worker');

const getAllWorker = async (req, res) => {
    const worker = await Worker.find();
    if (!worker) return res.status(204).json({ 'message': 'No Worker found.' });
    res.json(worker);
}

const createNewWorker = async (req, res) => {
    const { firstname,lastname, email,role,seniority ,userId} = req.body;
    let arr = []
    if (!firstname|| !lastname|| !email ||  !role ||!seniority ||!userId) {
        
        !firstname && arr.push('firstname')
        !lastname && arr.push('lastname')
        !email && arr.push('email')
        !role && arr.push('role')
        !userId && arr.push('userId')
        !seniority && arr.push('seniority')
        
        return res.status(400).json({ 'you must fill:':  arr });
    } 
    const duplicate = await Worker.findOne({ email:email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        const result = await Worker.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role:req.body.role,
            userId:req.body.userId,
            seniority:req.body.seniority
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateWorker = async (req, res) => {
    const { firstname,lastname, email,role,seniority,userId } = req.body;

    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const worker = await Worker.findOne({ _id: req.params._id }).exec();
    if (!worker) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.body._id}.` });
    }
    
    // if(!firstname || !lastname || !email || !role || !seniority || !userId){
    //     return res.status(400).json({ 'message': ' parameters is required.' });
    // }
   
    if (req.body?.firstname) worker.firstname = req.body.firstname;
    if (req.body?.lastname) worker.lastname = req.body.lastname;
    if (req.body?.email) worker.email = req.body.email;
    if (req.body?.role) worker.role = req.body.role;
    if (req.body?.userId) worker.userId = req.body.userId;
    if (req.body?.seniority) worker.seniority = req.body.seniority;
    const result = await worker.save();
    res.json(result);
}

const deleteWorker = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const worker = await Worker.findOne({ _id: req.params._id }).exec();
    if (!worker) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.params._id}.` });
    }
    const result = await worker.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getWorker = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const worker = await Worker.findOne({ _id: req.params._id }).exec();
    if (!worker) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.params._id}.` });
    }
    res.json(worker);
}

const getWorkerByUserId = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const worker = await Worker.find({ userId: req.params.userId })
    if (!worker) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.params.userId}.` });
    }
    res.json(worker);
}

module.exports = {
    getAllWorker,
    createNewWorker,
    updateWorker,
    deleteWorker,
    getWorker,
    getWorkerByUserId
}