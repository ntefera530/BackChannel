import express from "express"
import WebSocket from 'ws'
import { WebSocketServer } from 'ws';
import { setUpWebSocket } from "./websockets/websocket.js";

import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv"

import cookieParser from "cookie-parser";



import http from "http"

import pool from './lib/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);

//Creates WebSocket Server
//const wss = new WebSocket.Server({port: 3000})


//need this to parse JSON bodies - Postman sends JSON
app.use(express.json())
app.use(cookieParser());

const wss = new WebSocketServer({port: 6000});
setUpWebSocket(wss);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is Listening on port: " + PORT)
    console.log("WebSocket is Listening on port: 6000")
});