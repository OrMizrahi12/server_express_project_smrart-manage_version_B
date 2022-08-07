//#6 import the model, bcrypt for pwd, jwt for token 
const User = require('../model/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    // #7 get the data from request
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // #8 check if the user exsist in mongoDB
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401);

    // #9 we compare between the password in mongoDB to req.pwd
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {

        // #10 we take the roles from the user
        const roles = Object.values(foundUser.roles).filter(Boolean);
        
        // #11 we create accessToken 
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );
        // #12 we create refreshToken
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // #13 we put the refreshToken in the user as A parameter
        foundUser.refreshToken = refreshToken;

        // #14 we save the user in mongoDB after the token is updated
        const result = await foundUser.save();

        // #14 save the token in cookie (for client side)
        res.cookie('jwt', refreshToken, { httpOnly: true,secure: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); 
        res.json({ roles, accessToken,foundUser });
      // secure: true,
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };

// #15 - verifyJWT.js -->