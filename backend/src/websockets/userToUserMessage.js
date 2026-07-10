import WebSocket from "ws";
import pool from '../lib/db.js';
import { saveMessagesQuery } from "../models/messageModel.js";
import { getChatParticipants } from "../models/chatModel.js";
import { signUrl } from "../controllers/uploadController.js";

export const sendMessageToUser = async (id, content, sender_id, chat_id, expire_by, sent_at, io, media_key = null, media_type = null) => {
    console.log(`User ${sender_id} --> Chat "${chat_id}", Content: ${content}, ID: ${id}`);
    console.log(` Message ID: ${id}`);
    console.log(`Expire: ${expire_by}`);

    try{

        await saveMessagesQuery(id, sender_id, chat_id, content || "", expire_by, media_key, media_type);
        const participants = await getChatParticipants(chat_id);

        const media_url = media_key ? await signUrl(media_key) : null;

        console.log("participants: -->", participants);

        const message = {
            id: id,
            content: content,
            sender_id: sender_id,
            chat_id: chat_id,
            expire_at: expire_by,
            sent_at: sent_at,
            media_url: media_url,
            media_type: media_type
        }

        participants.forEach(participant => {
            io.to(participant.id).emit("newMessage", message);
        });

    }
    catch(error){
        console.log("Error in userToUserMessage.js: ", error);
    }   
}