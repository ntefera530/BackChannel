import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"
import cookie from 'cookie';
import * as rtc from "../lib/callState.js"

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
          const { id, type, content, sender_id, chat_id, sent_at, expire_at, target_user_id} = JSON.parse(message);

          //TODO add validation for message content and type to prevent malformed messages from crashing the server
          
          switch(type){
            case "sendMessageToUser":
              sendMessageToUser(id, content, sender_id, chat_id, expire_at, sent_at, clientsMap);
              break;

            case "offer-call":
              const call = rtc.startCall(chat_id, id, sender_id);
              if (call.error) {
                ws.send(JSON.stringify({ type: "call-error", message: call.error }));
                break;
              }
              ws.activeCallChatId = chat_id; // ← track it
              rtc.sendCallSignal(type, { id, content, sender_id, chat_id, target_user_id }, clientsMap);
              break;

            case "answer-call":
              rtc.joinCall(chat_id, sender_id);
              ws.activeCallChatId = chat_id; // ← track it
              rtc.sendCallSignal(type, { id, content, sender_id, chat_id, target_user_id }, clientsMap);
              break;

            case "end-call":
              rtc.endCall(chat_id);
              rtc.sendCallSignal(type, { id, content, sender_id, chat_id, target_user_id }, clientsMap);
              break;

            case "ice-candidate":
              rtc.sendCallSignal(type, { id, content, sender_id, chat_id, target_user_id }, clientsMap);
              break;
          }
        } catch(err){
          console.log("websocket.js - malformed message:", err.message);
        }
      });

      ws.on('close', () => {
        console.log('Websocket.js - Client disconnected');
        clientsMap.delete(clientId);
        if (ws.activeCallChatId) {
            rtc.leaveCall(ws.activeCallChatId, clientId);
        }
      });

    } catch(err){
      console.log("websocket.js - invalid token:", err.message);
      ws.close(1008, "Invalid Token");
    }
    
  });
}

