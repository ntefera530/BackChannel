import express from "express"

import { WebSocketServer } from 'ws';
import { Server } from 'socket.io';

//import { startScheduler } from "./lib/scheduler.js";
import { setUpSocketIO } from "./websockets/websocket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import http from "http"
import cors from "cors";
import logger from "./lib/logger.js";
import pinoHttp from "pino-http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const backend = process.env.BACKEND_URL || 'http://localhost:5173';
const websocket = process.env.WEBSOCKET_URL || 'ws://localhost:5173';

app.use(express.json())
app.use(cookieParser());

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim());

  
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(pinoHttp({ logger }));

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/uploads", uploadRoutes);

//Starts HTTP 
const server = http.createServer(app);

//Start Socket.IO server
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
});
setUpSocketIO(io);
app.set("io", io);  

server.listen(PORT, async () => {
    console.log("Server is Listening on port: " + PORT);
    //await startScheduler();
});