const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use disk storage (file saved temporarily)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// Upload Controller
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded"
            });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Delete file from local uploads folder
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            url: result.secure_url
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Upload failed"
        });
    }
};

module.exports = { uploadImage, upload };
