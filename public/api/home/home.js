const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({"msg": "hello my frind, welcome to the server"});
});

module.exports = router;