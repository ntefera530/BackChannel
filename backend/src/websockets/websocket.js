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
      console.log(clientId);
      //store the userId with their websoccket connection - manage diffrent users
      clientsMap.set(clientId, ws);

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        const { type, data, sender, recipient } = JSON.parse(message);

        switch(type){
            case "sendMessageToUser":
                sendMessageToUser(ws, sender, recipient, data, clientsMap);
            break;

            case "sendMessageToGroup": 
                sendMessageToGroup(ws, sender, recipient, data);
            break;
        }
        
        // Echo the message back to all connected clients
        // wss.clients.forEach((client) => {
        //   if (client.readyState === WebSocket.OPEN) {
        //     client.send(`Server received: ${message}`);
        //   }
        // });

      });
    
      ws.on('close', () => {
        console.log('Client disconnected');
        clientsMap.delete(clientId);
      });


    }
    else{
      //if no userId  - close the connection
      ws.close();
    }

    });
}

