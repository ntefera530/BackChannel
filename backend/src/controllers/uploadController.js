import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3 from "../lib/s3.js";

export const getProfileUploadUrl = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fileType } = req.query;

    if (!fileType) {
        return res.status(400).json({ message: "File type required" });
    }

    const extension = fileType.split("/")[1];

    const key = `profile-pictures/${userId}/profile.${extension}`;

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

export const getProfileDownloadUrl = async (req, res) => {
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