import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"
import cookie from 'cookie';
//import * as rtc from "../lib/callState.js"

//Socket.IO
export const setUpSocketIO = (io) => {

  io.use((socket, next) => {

    const cookies = cookie.parse(socket.handshake.headers.cookie || '');
    const token = cookies.jwt;

    if(!token){
      console.log("websocket.js - failed no token"); 
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      console.log("websocket.js - invalid token:", err.message);
      next(new Error("Authentication error"));
    }

  });

  io.on('connection', (socket) => {
    const clientId = socket.user.userId;
    console.log('websocket.js - Client connected:', clientId);

    socket.join(clientId); // Join a room with the user's ID

    //TODO add message validation

    socket.on("sendMessageToUser", ({ id, content, sender_id, chat_id, sent_at, expire_at, media_key, media_type }) => {
      sendMessageToUser(id, content, sender_id, chat_id, expire_at, sent_at, io, media_key, media_type);
    });

    //TODO - add RTC capabilities for video calls

    socket.on('disconnect', () => {
      console.log('websocket.js - Client disconnected:', clientId);
    });
  });


  
}
