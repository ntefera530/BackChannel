import { Queue } from "bullmq";
import { createRedisConnection } from "../lib/redis.js";

export const messageDeletionQueue = new Queue("message-deletion", {
    connection: createRedisConnection(),
});