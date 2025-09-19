import WebSocket from "ws";
import pool from '../lib/db.js';
import { saveMessagesQuery } from "../models/messageModel.js";

export const sendMessageToUser = async (id, content, sender_id, chat_id, expire_by, clientsMap) => {
    console.log(`User ${sender_id} --> Chat "${chat_id}", Content: ${content}`);

    try{
    
        await saveMessagesQuery(id, sender_id, chat_id, content, expire_by);
        const participants = await getChatParticipantsQuery(chat_id);
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