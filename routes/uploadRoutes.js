const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// We will resolve the base URL dynamically from the request headers

// Route to handle multiple image uploads
router.post('/', (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message || 'File upload error' });
        }
        next();
    });
}, (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(200).json({ success: true, message: 'No images uploaded', urls: [] });
        }

        // Return FULL absolute URLs dynamically so frontend & app can load them anywhere
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const fileUrls = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);

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
