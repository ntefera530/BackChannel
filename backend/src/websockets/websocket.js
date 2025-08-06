import WebSocket from "ws"
import { sendMessageToGroup } from "./userToGroupMessage.js";
import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"

export const setUpWebSocket = (wss) => {

  //Map of clients conected to server (id, websocet object);
  const clientsMap = new Map();

  wss.on('connection', (ws, req) => {
    console.log('Client connected');

    //Need to get JWT from cookie -- currently hard coded into websocekt header. TODO remove hard coding
    const token = req.headers.cookie;
    if(!token){
      ws.close(); 
      return;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const clientId = decoded.userId;

    if(clientId){

      //store the userId with their websoccket connection - manage diffrent users
      clientsMap.set(clientId, ws);

      ws.on('message', (message) => {
        const { type, content, sender_id, recipient_id} = JSON.parse(message);

        switch(type){
            case "sendMessageToUser":
                sendMessageToUser(content, sender_id, recipient_id, clientsMap);
            break;

            case "sendMessageToGroup": 
                sendMessageToGroup(ws, content, sender_id, recipient_id);
            break;
        }

      });
    
      ws.on('close', () => {
        console.log('Client disconnected');
        clientsMap.delete(clientId);
      });
    }
    else{
      ws.close();
    }
    
  });
}

