const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const appconfig = require('./config/appconfig');

// custom routes
const users = require('./routes/users');
const campaigns = require('./routes/campaigns');
const upload = require('./routes/upload');

// establish database connection
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
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
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// serve resources from public folder
app.use("/public", express.static(path.join(__dirname, 'public')));

// routes
app.use('/users', users);
app.use('/campaigns', campaigns);
app.use('/upload', upload);
app.get('/', (req, res) => {
    res.send('Athwela API v1');
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
