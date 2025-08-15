import WebSocket from "ws";
import pool from '../lib/db.js';

export const sendMessageToUser = async (id, content, sender_id, chat_id, clientsMap) => {
    console.log(`User ${sender_id} --> Chat "${chat_id}", Content: ${content}`);

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
                chat: chat_id
            }

            if(!participantWs || participantWs.readyState !== WebSocket.OPEN){
                console.log(`userToUserMessage.js - Participant ${participantId} websocket not connected`);
            }
            else{
                participantWs.send(JSON.stringify(message)); 
            }


        });
    }
    catch(error){
        console.log("Error in userToUserMessage.js: ", error);
    }   
}