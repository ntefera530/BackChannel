import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../lib/s3.js";

const getS3key = (userId, uploadType, extension) => {
  switch(uploadType){
    case "profile":
      return `profile-pictures/${userId}/profile.${extension}`;
    case "chat-picture":
      return `chat-pictures/${userId}/${Date.now()}.${extension}`;
    case "chat-media":
      return `chat-media/${userId}/${Date.now()}.${extension}`;
    default:
      throw new Error("Invalid upload type");
  }
}

export const getUploadUrl = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileType, uploadType } = req.query;

    if (!fileType) {
        return res.status(400).json({ message: "File type required" });
    }
    if (!uploadType) return res.status(400).json({ message: "Upload type required" });
    
    const extension = fileType.split("/")[1];
    let key;
    try {
        key = getS3key(userId, uploadType, extension);
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