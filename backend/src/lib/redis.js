import {Redis} from 'ioredis';
import dotenv from "dotenv";

dotenv.config();

export const createRedisConnection = () => {
    const client = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD || undefined,
        ...(process.env.REDIS_TLS === 'true' ? { tls: {} } : {}),
        maxRetriesPerRequest: null, 
    });

    client.on("connect", () => console.log("Connected to Redis!"));
    client.on("error", err => console.error("Redis connection error:", err));

    return client;
};