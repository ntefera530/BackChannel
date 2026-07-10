import { cleanupExpiredMessagesQuery } from "../models/messageModel.js"
import { deleteObjects } from "../controllers/uploadController.js"
import { Worker } from "bullmq";
import { redisClient } from "../lib/redis.js";

const worker = new Worker(
  "message-deletion",
  async job => {
    console.log(`Worker processing job ${job.id}`);  // Log when job starts

    if (job.name === "delete-expired-messages") {
      const result = await cleanupExpiredMessagesQuery()
      await deleteObjects(result.map(row => row.media_key));
      console.log(`Deleted ${result.length} expired messages`);
    }

  },
  {
    connection: redisClient,
  }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed successfully!`);
});

worker.on("failed", (job, err) => {
  console.error("Cleanup job failed:", err);
});

worker.on("error", err => console.error("Worker error:", err));
worker.on("active", job => console.log("Processing job:", job.id, job.name));