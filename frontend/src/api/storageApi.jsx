import axios from 'axios';
import api from './api';

// Generic — gets a signed URL for any upload
const getUploadUrl = async (fileType, uploadType) => {
    const response = await api.get('/api/v1/uploads/upload-url', {
        params: { fileType, uploadType } // uploadType = 'profile' | 'chat-picture' | 'chat-media'
    });
    return response.data; // { uploadUrl, key }
}

// Generic — puts the file to S3 using the signed URL
const uploadToS3 = async (uploadUrl, file) => {
    await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type }
    });
}

// Specific helpers that compose the above
export const uploadProfilePicture = async (file) => {
    const { uploadUrl, key } = await getUploadUrl(file.type, 'profile');
    await uploadToS3(uploadUrl, file);
    return key;
}

export const uploadChatPicture = async (file) => {
    const { uploadUrl, key } = await getUploadUrl(file.type, 'chat-picture');
    await uploadToS3(uploadUrl, file);
    return key;
}

export const uploadChatMedia = async (file) => {
    const { uploadUrl, key } = await getUploadUrl(file.type, 'chat-media');
    await uploadToS3(uploadUrl, file);
    return key;
}

//--------------------------------------------------------------------------
export const downloadProfilePicture = async (userId) => {
    const response = await api.get(`/api/v1/users/${userId}/profilePicture`);
    return response.data.profilePictureUrl.profile_picture_url;
}

export const getSignedUrl = async (key) => {
    const response = await api.get('/api/v1/uploads/download-url', {
        params: { key }
    });
    return response.data.signedUrl;
}

export const getProfilePicture = async (userId) => {
    const key = await downloadProfilePicture(userId);
    if (!key) return null;
    return await getSignedUrl(key);
}