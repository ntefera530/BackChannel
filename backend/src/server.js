import express from "express"
import WebSocket from 'ws'
import { WebSocketServer } from 'ws';
import { setUpWebSocket } from "./websockets/websocket.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import http from "http"
import pool from './lib/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);

//need this to parse JSON bodies - Postman sends JSON
app.use(express.json())
app.use(cookieParser());

//Creates WebSocket Server
const wss = new WebSocketServer({port: 6000});
setUpWebSocket(wss);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log("Server is Listening on port: " + PORT)
    console.log("WebSocket is Listening on port: 6000")
});