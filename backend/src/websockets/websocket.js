import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"
import cookie from 'cookie';

export const setUpWebSocket = (wss) => {

  //Map of clients conected to server (id, websocet object);
  const clientsMap = new Map();

  wss.on('connection', (ws, req) => {
    console.log('websocket.js - Client connected');

    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwt;

    if(!token){
      console.log("websocket.js - failed no token");
      ws.close(); 
      return;
    }

    try{

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      ws.user = decoded;
      const clientId = decoded.userId;

      clientsMap.set(clientId, ws);

      ws.on('message', (message) => {
        try{
          const { id, type, content, sender_id, chat_id, sent_at, expire_at} = JSON.parse(message);

          //TODO add validation for message content and type to prevent malformed messages from crashing the server
          
          switch(type){
            case "sendMessageToUser":
                sendMessageToUser(id, content, sender_id, chat_id, expire_at, sent_at, clientsMap);
            break;
          }
        } catch(err){
          console.log("websocket.js - malformed message:", err.message);
        }
      });

      ws.on('close', () => {
        console.log('Websocket.js - Client disconnected');
        clientsMap.delete(clientId);
      });

    } catch(err){
      console.log("websocket.js - invalid token:", err.message);
      ws.close(1008, "Invalid Token");
    }
    
  });
}

