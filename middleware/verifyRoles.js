// #22 the function verifyRoles get the roles_list from workers.js
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // #23 check if there is roles
        if (!req.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        // #24 arr on the roles !--OF THE USER--!
        // map - one per one item ,this code is find if the role is inclode in the rolesArray --> 
        // find - if the value is exsist 
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles

// #25 done the process.