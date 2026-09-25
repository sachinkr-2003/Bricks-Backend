const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// Backend's own public URL (Render deployment)
const BACKEND_URL = process.env.BACKEND_URL || 'https://bricks-backend-fk3q.onrender.com';

// Route to handle multiple image uploads
router.post('/', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images uploaded' });
        }

        // ✅ Return FULL absolute URLs so Vercel frontend can load them
        const fileUrls = req.files.map(file => `${BACKEND_URL}/uploads/${file.filename}`);

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
