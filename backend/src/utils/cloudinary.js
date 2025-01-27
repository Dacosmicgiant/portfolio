import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
};

// Validate Cloudinary configuration
if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error("Missing Cloudinary configuration:", {
        cloud_name: !!cloudinaryConfig.cloud_name,
        api_key: !!cloudinaryConfig.api_key,
        api_secret: !!cloudinaryConfig.api_secret
    });
    throw new Error("Missing required Cloudinary configuration");
}

cloudinary.config(cloudinaryConfig);

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided to uploadOnCloudinary");
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(localFilePath)) {
            console.error(`File not found at path: ${localFilePath}`);
            return null;
        }

        console.log("Uploading to Cloudinary:", localFilePath);
        console.log("Cloudinary Config:", {
            cloud_name: cloudinaryConfig.cloud_name,
            api_key: cloudinaryConfig.api_key ? "exists" : "missing",
            api_secret: cloudinaryConfig.api_secret ? "exists" : "missing"
        });

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File uploaded successfully to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
        return response;

    } catch (error) {
        console.error("Error in uploadOnCloudinary:", error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
        }
        return null;
    }
}
