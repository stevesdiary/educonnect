const cloudinary = require('cloudinary').v2;

async function uploadFile(filePath, options = {}) {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return { status: 200, message: 'File uploaded successfully', data: result };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

module.exports = { uploadFile };
