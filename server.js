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
const favicon = require('serve-favicon')

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.join(__dirname,"public")))
app.use(favicon(path.join(__dirname, 'public','views', 'favicon.ico'))) 

app.use('/', require('./public/api/home/index'))
app.use('/register',require('./public/routes/verifications/register')) //#1 (to #2 go to rejisterController.js)
app.use('/auth',require('./public/routes/verifications/auth')) 
app.use('/refresh', require('./public/routes/verifications/refresh'));
app.use('/logout', require('./public/routes/verifications/logout'));
app.use('/workers',require('./public/api/workers'))
app.use('/posts',require('./public/api/posts'))
app.use('/todos',require('./public/api/todos'))
app.use('/projects',require('./public/api/projects'))
app.use('/ideas',require('./public/api/ideas'))
app.use('/meetings',require('./public/api/meetings'))
app.use('/remainders',require('./public/api/remainders'))

app.use(verifyJWT);
app.use('/users',require('./public/api/users'))

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
    
});
