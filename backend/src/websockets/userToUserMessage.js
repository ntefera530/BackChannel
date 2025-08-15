import WebSocket from "ws";
import pool from '../lib/db.js';

export const sendMessageToUser = async (id, content, sender_id, chat_id, clientsMap) => {
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
            await pool.query('INSERT INTO "Messages" (id, sender_id, chat_id, content) VALUES ($1, $2, $3, $4)', [id, sender_id, chat_id, content]);
            const participants = await pool.query('SELECT user_id FROM "Chat Participants" WHERE chat_id = $1',[chat_id]);
            console.log(participants.rows);

            participants.rows.forEach(row =>{


                const participantId = row.user_id;
                const participantWs = clientsMap.get(participantId);
                const message = {
                    content: content,
                    sender: sender_id,
                }

                //console.log(participantWs)
                if(participantWs.readyState === WebSocket.OPEN){
                    participantWs.send(JSON.stringify(message));
                }

            })
        }

        catch(error){
            console.log("DB ERROR: ", error);
        }   
    //}
    //If not then store to be sent later
    //else{
        //console.log(`${sender_id} is not connected`);
    //}
}