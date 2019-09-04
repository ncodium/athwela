const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');


// config fiels
const config = require('./config/database');

// custom routes
const users = require('./routes/users');
var campaigns = require('./routes/campaigns.js');

// establish database connection
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// initiate app
const app = express();
const port = 3000;

// CORS middleware
app.use(cors());

// body-parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// serve resources from public folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/users', users);
app.use('/campaigns', campaigns);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
