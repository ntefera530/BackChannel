import WebSocket from "ws"
import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"
import url from 'url';
import cookie from 'cookie';

export const setUpWebSocket = (wss) => {

  //Map of clients conected to server (id, websocet object);
  const clientsMap = new Map();

  wss.on('connection', (ws, req) => {
    console.log('websocket.js - Client connected');

    //Need to get JWT from cookie -- currently hard coded into websocekt header. TODO remove hard coding
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.jwt;

    if(!token){
      console.log("websocket.js - failed no token");
      ws.close(); 
      return;
    }

    ws.user = jwt.verify(token, process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.userId;

    if(clientId){

      clientsMap.set(clientId, ws);

      ws.on('message', (message) => {
        const { id, type, content, sender_id, chat_id, sent_at, expire_at} = JSON.parse(message);
        
        switch(type){
            case "sendMessageToUser":
                sendMessageToUser(id, content, sender_id, chat_id, expire_at, sent_at, clientsMap);
            break;
        }

      });
    
      ws.on('close', () => {
        console.log('Websocket.js - Client disconnected');
        clientsMap.delete(clientId);
      });
    }
    else{
      ws.close();
    }
    
  });
}

