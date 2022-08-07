const Todo = require('../model/Todo');

const getAllTodos = async (req, res) => {
    const todo = await Todo.find();
    if (!todo) return res.status(204).json({ 'message': 'No todo found...' });
    res.json(todo);
}

const createNewTodo = async (req, res) => {
    const { todo,Completed,userId} = req.body;
    let arr = []
    if (!todo|| !Completed ||!userId) {
        
        !todo && arr.push('todo')
        !Completed && arr.push('Completed') 
        !userId && arr.push('userId')
        return res.status(400).json({ 'you must fill:':  arr });
    } 
 
    try {
        const result = await Todo.create({
            todo: req.body.todo,
            Completed: req.body.Completed,
            userId: req.body.userId,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateTodo = async (req, res) => {
 
  
    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const todo = await Todo.findOne({ _id: req.params._id }).exec();
    if (!todo) {
        return res.status(204).json({ "message": `No todo matches ID ${req.body._id}.` });
    }

    if (req.body?.todo) todo.todo = req.body.todo;
    if (req.body?.Completed) todo.Completed = req.body.Completed;
    if (req.body?.userId) todo.userId = req.body.userId;

    const result = await todo.save();
    res.json(result);
}

const deleteTodo = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'todo ID required.' });

    const todo = await Todo.findOne({ _id: req.params._id }).exec();
    if (!todo) {
        return res.status(204).json({ "message": `No todo matches ID ${req.params._id}.` });
    }
    const result = await todo.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getTodo = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const todo = await Todo.findOne({ _id: req.params._id }).exec();
    if (!todo) {
        return res.status(204).json({ "message": `No todo matches ID ${req.params._id}.` });
    }
    res.json(todo);
}
const getTodoById = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const todo = await Todo.find({ userId: req.params.userId });
    if (!todo) {
        return res.status(204).json({ "message": `No todo matches ID ${req.params.userId}.` });
    }
    res.json(todo);
}

module.exports = {
    getAllTodos,
    createNewTodo,
    updateTodo,
    deleteTodo,
    getTodo,
    getTodoById
}