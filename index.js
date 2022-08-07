require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn'); 

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/', require('./routes/home/index'))
app.use('/register',require('./routes/verifications/register')) //#1 (to #2 go to rejisterController.js)
app.use('/auth',require('./routes/verifications/auth')) 
app.use('/refresh', require('./routes/verifications/refresh'));
app.use('/logout', require('./routes/verifications/logout'));

// protect routes
// #19 the user pass the verification successfully

// #20 the user want to do put,delet, or another request (for #21 go to workers.js )
app.use('/workers',require('./routes/api/workers'))
app.use('/posts',require('./routes/api/posts'))
app.use('/todos',require('./routes/api/todos'))
app.use('/projects',require('./routes/api/projects'))
app.use('/ideas',require('./routes/api/ideas'))
app.use('/meetings',require('./routes/api/meetings'))
app.use('/remainders',require('./routes/api/remainders'))

app.use(verifyJWT);
app.use('/users',require('./routes/api/users'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});