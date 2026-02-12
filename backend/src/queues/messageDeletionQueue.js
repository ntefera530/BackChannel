import { Queue } from "bullmq";
import { redisClient } from "../lib/redis.js";

export const messageDeletionQueue = new Queue("message-deletion", {
    connection: redisClient,
});