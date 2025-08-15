import WebSocket from "ws";
import pool from '../lib/db.js';

export const sendMessageToUser = async (content, sender_id, chat_id, clientsMap) => {
    console.log(`User ${sender_id} --> Chat "${chat_id}": ${content}`);
   
    // Need to parse string id to userID, fix this??
    const client = clientsMap.get(parseInt(sender_id));

    //Json message to send over websocket idea
    // const dataToSend = {
    //     message: "User update",
    //     userId: 123,
    //     status: "online"
    // };
    // websocket.send(JSON.stringify(dataToSend));

    //If Other user is connected, send to them
    //if(client && client.readyState === WebSocket.OPEN){
        //client.send(content);
        try{
            await pool.query('INSERT INTO "Messages" (sender_id, chat_id, content) VALUES ($1, $2, $3)', [sender_id, sender_id, content]);
        }
        catch(error){
            console.log("DB ERROR");
        }   
    //}
    //If not then store to be sent later
    //else{
        //console.log(`${sender_id} is not connected`);
    //}
}