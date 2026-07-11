import { S3Client, PutObjectCommand, GetObjectCommand,  DeleteObjectCommand, DeleteObjectsCommand   } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../lib/s3.js";

const getS3key = (userId, chatId, uploadType, extension) => {
  switch(uploadType){
    case "profile":
      return `profile-pictures/${userId}/profile.${extension}`;
    case "chat-picture":
      return `chat-pictures/${chatId}/${Date.now()}.${extension}`;
    case "chat-media":
      return `chat-media/${chatId}/${Date.now()}.${extension}`;
    default:
      throw new Error("Invalid upload type");
  }
}

const ALLOWED_CHAT_MEDIA_TYPES = /^(image|video)\//;
const ALLOWED_PICTURE_TYPES = /^image\//;

export const getUploadUrl = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileType, uploadType, chatId } = req.query;

    if (!fileType) {
        return res.status(400).json({ message: "File type required" });
    }
    if (!uploadType) return res.status(400).json({ message: "Upload type required" });
    
    if (uploadType === "chat-media" && !ALLOWED_CHAT_MEDIA_TYPES.test(fileType)) {
        return res.status(400).json({ message: "Only image or video files are allowed" });
    }
    if ((uploadType === "profile" || uploadType === "chat-picture") && !ALLOWED_PICTURE_TYPES.test(fileType)) {
        return res.status(400).json({ message: "Only image files are allowed" });
    }    


    const extension = fileType.split("/")[1];
    let key;
    try {
        key = getS3key(userId, chatId, uploadType, extension);
    } catch (err) {
        return res.status(400).json({ message: err.message }); 
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    res.status(200).json({ uploadUrl, key });

  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error generating upload URL" });
  }
};

export const getDownloadUrl = async (req, res) => {
  try {
    const { key } = req.query;

    if (!key){
        return res.status(400).json({ message: "Key required" });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    res.status(200).json({ signedUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating download URL" });
  }
}


export const signUrl = async (unsignedUrlKey) => {
   try {

    if (!unsignedUrlKey){
        return null;
    }

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: unsignedUrlKey,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    return signedUrl;

  } catch (err) {
    console.error(err);
    return null;
  }
}

export const deleteObject = async (key) => {
  if (!key) return;
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    }));
  } catch (err) {
    //TODO Run a cleanup check later, dont cancel DB
    console.error(`Error deleting R2 object "${key}":`, err);
  }
}

//Batch Deletion
export const deleteObjects = async (keys) => {
  const validKeys = [...new Set((keys || []).filter(Boolean))];
  if (validKeys.length === 0) return;

  try {
    for (let i = 0; i < validKeys.length; i += 1000) {
      const chunk = validKeys.slice(i, i + 1000);
      await s3.send(new DeleteObjectsCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: { Objects: chunk.map(Key => ({ Key })) },
      }));
    }
  } catch (err) {
    console.error("Error batch deleting R2 objects:", err);
  }
}