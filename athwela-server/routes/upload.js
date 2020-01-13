const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const appconfig = require('../config/appconfig');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(appconfig.public, err => {
            if (err) console.log(err.message); // directory exists
            cb(null, appconfig.public);
        })
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.send({
            success: false
        });
    } else {
        console.log("File uploaded at: " + req.file.path);
        return res.send({
            success: true,
            path: req.file.path
        })
    }
})

module.exports = router;