const Post = require('../model/Post');

const getAllPosts = async (req, res) => {
    const post = await Post.find();
    if (!post) return res.status(204).json({ 'message': 'No posts found...' });
    res.json(post);
}

const createNewPost = async (req, res) => {
    const { title,body,userId,like,unlike} = req.body;
    let arr = []
    if (!title|| !body ||!userId ) {
        
        !title && arr.push('title')
        !body && arr.push('body') 
        !userId && arr.push('userId')
        !like && arr.push('like') 
        !unlike && arr.push('unlike')
        return res.status(400).json({ 'you must fill:':  arr });
    } 
 
    try {
        const result = await Post.create({
            title: title,
            body: body,
            userId: userId,
            like:like,
            unlike:unlike
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updatePost = async (req, res) => {
    const { title,body,userId ,like,unlike} = req.body;
    
    if (!req?.params?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.body._id}.` });
    }

    if (title) post.title = title
    if (body) post.body = body
    if (userId) post.userId = userId
    if (like) post.like = like
    if (unlike) post.unlike = unlike

    const result = await post.save();
    res.json(result);
}

const deletePost = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'post ID required.' });

    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params._id}.` });
    }
    const result = await post.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getPost = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Worker ID required.' });

    const post = await Post.findOne({ _id: req.params._id }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params._id}.` });
    }
    res.json(post);
}

const getPostByUserId = async (req, res) => {
    if (!req?.params?.userId) return res.status(400).json({ 'message': 'Worker ID required.' });

    const post = await Post.find({ userId: req.params.userId }).exec();
    if (!post) {
        return res.status(204).json({ "message": `No post matches ID ${req.params.userId}.` });
    }
    res.json(post);
}

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost,
    getPost,
    getPostByUserId
}