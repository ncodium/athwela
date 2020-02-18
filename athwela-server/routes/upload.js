const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const appconfig = require('../config/appconfig');

// storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(appconfig.public, err => {
            if (err) console.log(err.message); // directory exists
            cb(null, appconfig.public);
        })
    },
    filename: function (req, file, cb) {
        // uses current date to avoid conflicts
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

// profile picture
router.post('/', upload.single('photo'), (req, res) => {
    if (!req.file) {
        res.send({
            success: false
        });
    } else {
        res.send({
            success: true,
            path: req.file.path
        })
    }
})

// campaign images
router.post("/images", upload.array("images", 16), (req, res) => {
    if (!req.files) {
        res.send({
            success: true,
            files: req.files.map(file => file.path) // url
        });
    } else {
        res.json({ success: false })
    }
});

// campaign documents
router.post("/documents", upload.array("documents", 16), (req, res) => {
    if (!req.files) {
        res.send({
            success: true,
            files: req.files.map(file => {
                // requires extra details of documents
                return {
                    path: file.path,
                    originalname: file.originalname,
                    size: file.size // bytes
                }
            })
        });
    } else {
        res.json({ success: false })
    }

});

module.exports = router;