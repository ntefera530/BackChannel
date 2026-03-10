import express from "express"

import { WebSocketServer } from 'ws';
import { startScheduler } from "./lib/scheduler.js";
import { setUpWebSocket } from "./websockets/websocket.js";


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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', //frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Allow all origins (for development only!)
//app.use(cors());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/friends", friendRoutes);
app.use("/api/v1/uploads", uploadRoutes);

//Starts HTTP and WebSocket server
const server = http.createServer(app);
const wss = new WebSocketServer({server});
setUpWebSocket(wss);

//TODO - start worker thread for background tasks like message cleanup, notification sending, etc.

server.listen(PORT, async () => {
    console.log("Server is Listening on port: " + PORT); //Both HTTP and WebSocket servers are running on the same port - use upgrade header to differentiate between them 
    await startScheduler();
});