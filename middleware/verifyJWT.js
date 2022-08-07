// #15 after the user almost login, before the permition we need verify the token
const jwt = require('jsonwebtoken'); 

const verifyJWT = (req, res, next) => {

    // #16 we check if there is token in the headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    // #17 we make the token clear
    const token = authHeader.split(' ')[1];
    
    // #18 we verify the token
    jwt.verify(
        // send the token
        token,
        // send the code in .env
        process.env.ACCESS_TOKEN_SECRET,

        (err, decoded) => {
            // decoded --> is the payload of jwt
            if (err) return res.sendStatus(403); //invalid token
            // we put in the token the user and roles
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}


module.exports = verifyJWT

// #19 - server.js -->