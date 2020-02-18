const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'PRODUCTION') {
    // load .env on development environment
    const dotenv = require('dotenv');

    try {
        dotenv.config();
        // successfully loaded .env file
        console.log('Starting development server with provided environment..');
    } catch (error) {
        // .env file not found
        console.log('Starting development server with default configuration..');
    }
}

// configs
const dbconfig = require('./config/dbconfig');
const appconfig = require('./config/appconfig');

// custom routes
const users = require('./routes/users');
const campaigns = require('./routes/campaigns');
const donations = require('./routes/donations');
const upload = require('./routes/upload');
const search = require('./routes/search');
const statistics = require('./routes/statistics');

// establish database connection
mongoose.connect(dbconfig.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + dbconfig.database);
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});

// initiate app
const app = express();
const port = appconfig.port;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

// serve public resources
app.use("/public", express.static(path.join(__dirname, appconfig.public)));

// routes
app.use('/users', users);
app.use('/campaigns', campaigns);
app.use('/donations', donations);
app.use('/search', search);
app.use('/upload', upload);
app.use('/stats', statistics);
app.get('/', (res) => {
    res.send('Athwela API v1');
});

app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
