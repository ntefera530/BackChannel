import WebSocket from "ws"
import { sendMessageToGroup } from "./userToGroupMessage.js";
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
    //console.log("websocket.js -Token", token);

    if(!token){
      console.log("websocket.js - failed no token");
      ws.close(); 
      return;
    }
    //console.log("websocket.js - token found")

    ws.user = jwt.verify(token, process.env.JWT_SECRET)

      //const token = params.get('token');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.userId;

    //console.log('websocket.js - Decoded');

    if(clientId){
      //console.log('websocket.js - Authed Client ID: ', clientId)
      //store the userId with their websoccket connection - manage diffrent users
      clientsMap.set(clientId, ws);

      ws.on('message', (message) => {
        const { id, type, content, sender_id, chat_id, sent_at, expire_at} = JSON.parse(message);
        console.log("Hello------>");       
        console.log(expire_at);
        switch(type){
            case "sendMessageToUser":
                sendMessageToUser(id, content, sender_id, chat_id, expire_at, sent_at, clientsMap);
            break;

            case "sendMessageToGroup": 
                sendMessageToGroup(ws, content, sender_id, chat_id);
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

