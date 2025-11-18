import WebSocket from "ws";
import pool from '../lib/db.js';
import { saveMessagesQuery } from "../models/messageModel.js";
import { getChatParticipantsQuery } from "../models/chatModel.js";

export const sendMessageToUser = async (id, content, sender_id, chat_id, expire_by, sent_at, clientsMap) => {
    console.log(`User ${sender_id} --> Chat "${chat_id}", Content: ${content}, ID: ${id}`);
    console.log(` Message ID: ${id}`);
    console.log(`Expire: ${expire_by}`);

    try{

        await saveMessagesQuery(id, sender_id, chat_id, content, expire_by);
        const participants = await getChatParticipantsQuery(chat_id);

        console.log(participants);

        participants.forEach(participant =>{

            const participantId = participant.user_id;
            const participantWs = clientsMap.get(participantId);
            const message = {
                id: id,
                content: content,
                sender_id: sender_id,
                chat_id: chat_id,
                expire_at: expire_by,
                sent_at: sent_at
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