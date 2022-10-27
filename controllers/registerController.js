const User = require('../model/User');
const bcrypt = require('bcrypt');
const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

const handleNewUser = async (req, res) => {
    const { user,email, pwd } = req.body;
    if (!user || !pwd || !email) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ username: user }).exec() 
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd,
            "registerDate":date
        });
        res.status(201).json({ result });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
