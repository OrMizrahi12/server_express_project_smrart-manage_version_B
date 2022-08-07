const Project = require('../model/Project');

const getAllProjects = async (req, res) => {
    const project = await Project.find();
    if (!project) return res.status(204).json({ 'message': 'No Worker found.' });
    res.json(project);
}

const createNewProject = async (req, res) => {
    const {
        projectName,
        workers,
        projectExplain,
        projectBudget,
        endDate,
        equipment,
        idManager,
        correctBudget,
        budget
    } = req.body;

    let arr = []

    if (
        !projectName ||
        !workers ||
        !idManager ||
        !projectExplain ||
        !projectBudget ||
        !endDate ||
        !equipment ||
        !correctBudget ||
        !budget

    ) {

        !projectName && arr.push('projectName')
        !workers && arr.push('workers')
        !projectExplain && arr.push('projectExplain')
        !projectBudget && arr.push('projectBudget')
        !equipment && arr.push('equipment')
        !endDate && arr.push('endDate')
        !idManager && arr.push('idManager')
        !correctBudget && arr.push('correctBudget')
        !budget && arr.push('budget')

        // return res.status(400).json({ 'you must fill:': arr });
    }

    try {
        const result = await Project.create({
            projectName: req.body.projectName,
            workers: req.body.workers,
            projectExplain: req.body.projectExplain,
            projectBudget: req.body.projectBudget,
            equipment: req.body.equipment,
            endDate: req.body.endDate,
            idManager: req.body.idManager,
            correctBudget:req.body.correctBudget,
            budget:req.body.budget,

        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateProject = async (req, res) => {
    let arr = []
    const {
        projectName,
        workers,
        projectExplain,
        projectBudget,
        endDate,
        equipment,
        idManager,
        correctBudget,
        budget
    } = req.body;

    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const project = await Project.findOne({ _id: req.params._id }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No Worker matches ID ${req.body._id}.` });
    }

    if (
   
        !projectName ||
        !workers ||
        !idManager ||
        !projectExplain ||
        !projectBudget ||
        !endDate ||
        !equipment ||
        !correctBudget ||
        !budget
    ) {


        !projectName && arr.push('projectName')
        !workers && arr.push('workers')
        !projectExplain && arr.push('projectExplain')
        !projectBudget && arr.push('projectBudget')
        !equipment && arr.push('equipment')
        !endDate && arr.push('endDate')
        !idManager && arr.push('idManager')
        !correctBudget && arr.push('correctBudget')
        !budget && arr.push('budget')

        // return res.status(400).json({ 'you must fill:': arr });
    }

    if (req.body?.projectName) project.projectName = req.body.projectName;
    if (req.body?.workers) project.workers = req.body.workers;
    if (req.body?.projectExplain) project.projectExplain = req.body.projectExplain;
    if (req.body?.projectBudget) project.projectBudget = req.body.projectBudget;
    if (req.body?.equipment) project.equipment = req.body.equipment;
    if (req.body?.endDate) project.endDate = req.body.endDate;
    if (req.body?.idManager) project.idManager = req.body.idManager;
    if (req.body?.correctBudget) project.correctBudget = req.body.correctBudget;
    if (req.body?.budget) project.budget = req.body.budget;
    const result = await project.save();
    res.json(result);
}

const deleteProject = async (req, res) => {

    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'Worker ID required.' });
    }
    const project = await Project.findOne({ _id: req.params._id }).exec();

    if (!project) {
        return res.status(204).json({ 'message': 'No projects found.' });
    }
    const result = await project.deleteOne();
    res.json(result);
}
const getProject = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.findOne({ _id: req.params._id }).exec();
    
    if (!project) return res.status(204).json({ "message": `No project matches ID ${req.params._id}.` });
    
    res.json(project);
}

const getProjectByUserId = async (req, res) => {
    if (!req?.params?.idManager) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.find({ idManager: req.params.idManager }).exec();
    
    if (!project) return res.status(204).json({ "message": `No project matches ID ${req.params.idManager}.` });
    
    res.json(project);
}

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject,
    getProject,
    getProjectByUserId
}