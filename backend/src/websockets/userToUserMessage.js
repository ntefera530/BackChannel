import WebSocket from "ws";
import pool from '../lib/db.js';

export const sendMessageToUser = async (content, sender_id, recipient_id, clientsMap) => {
    console.log(`User ${sender_id} --> User "${recipient_id}": ${content}`);
   
    // Need to parse string id to userID, fix this??
    const client = clientsMap.get(parseInt(recipient_id));

    if(client && client.readyState === WebSocket.OPEN){
        client.send(content);
        try{
            await pool.query('INSERT INTO "Messages"' + 
            '(sender_id, recipient_id, content) VALUES ($1, $2, $3)', 
            [sender_id, recipient_id, content]);
        }
        catch(error){
            console.log("DB ERROR");
        }
        
    }
    else{
        console.log(`${recipient} is not connected`);
    }
    //If Other user is connected, send to them
    //If not then store to be sent later.
}