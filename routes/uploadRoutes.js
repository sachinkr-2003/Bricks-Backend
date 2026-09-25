const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// Route to handle multiple image uploads
// Expects an array of files under the field name 'images'
router.post('/', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }

        // Map files to generate full URLs for the client to access
        // Example output: /uploads/images-1234567.jpg
        const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            urls: fileUrls
        });
    } catch (error) {
        console.error('Upload Error: ', error);
        res.status(500).json({ success: false, message: 'Server error during file upload' });
    }
});

module.exports = router;
