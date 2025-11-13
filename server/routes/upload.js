const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controllers/uploadController');

router.post('/', upload.single('image'), uploadImage);

module.exports = router;
