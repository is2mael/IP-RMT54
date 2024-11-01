require('dotenv').config()
const { v2: cloudinary } = require('cloudinary');

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

module.exports = async (file, model, data, folder) => {
    const base64Tesk = file.buffer.toString('base64')
    const mimeType = file.mimetype
    const base64imge = `data:${mimeType};base64,${base64Tesk}`

    const uploadResult = await cloudinary.uploader.upload(base64imge, {
        public_id: `${model}_${data.id}`,
        folder
    })
    return uploadResult
}