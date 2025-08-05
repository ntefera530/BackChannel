import WebSocket from "ws"
import { sendMessageToGroup } from "./userToGroupMessage.js";
import { sendMessageToUser } from "./userToUserMessage.js";
import jwt from "jsonwebtoken"

export const setUpWebSocket = (wss) => {
    wss.on('connection', (ws, req) => {
      console.log('Client connected');

    //Need to get JWT from cookie -- currently hard coded into websocekt header. TODO remove hard coding
    const token = req.headers.cookie;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const clientId = decoded.userId;
    console.log(decoded);
    console.log(clientId);

      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        const { type, data, sender, recipient } = JSON.parse(message);
        console.log(type);

        switch(type){
            case "sendMessageToUser":
                sendMessageToUser(ws, sender, recipient, data);
            break;

            case "sendMessageToGroup": 
                sendMessageToGroup(ws, sender, recipient, data);
            break;
        }
        // Echo the message back to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`Server received: ${message}`);
          }
        });
      });
    
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
}

