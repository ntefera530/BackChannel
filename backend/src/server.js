import express from "express"
import WebSocket from 'ws'
import { WebSocketServer } from 'ws';
import { setUpWebSocket } from "./websockets/websocket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import http from "http"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser());

const server = http.createServer(app);

//need this to parse JSON bodies - Postman sends JSON


// Allow all origins (for development only!)
//app.use(cors());

//If you want more control: ie adding coockies
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/friends", friendRoutes);

//Creates WebSocket Server
const wss = new WebSocketServer({port: 8080});
setUpWebSocket(wss);





app.listen(PORT, () => {
    console.log("Server is Listening on port: " + PORT)
    console.log("WebSocket is Listening on port: 6000")
});