import pool from '../lib/db.js';
import * as messageRepo from "../models/messageModel.js"

//TODO - get all messages user has sent in app
export const getAllMessages = async (req, res) => {
    console.log("get Messages");

    try{

        const userId = req.user.userId;
        const {chatId} = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;


        const messages = await messageRepo.getAllMessagesQuery(userId, limit, offset);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO - get all messages in chat 
export const getMessagesByChatId = async (req, res) => {
    console.log("get Messages");

    try{

        const userId = req.user.userId;
        const {chatId} = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;


        const messages = await messageRepo.getMessagesByChatIdQuery(chatId, limit, offset);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO - delete selected messages
export const deletSelectedMessages = async (req, res) => {
    console.log(" Selected Delete Message");

    try{
        const {messageId, chatId, userId} = req.params;

        await messageRepo.deleteMessageQuery(chatId, userId, messageId); //N
        return res.status(200).json({ message: "Delete Message" });
    }
    catch(error){
        console.error("Error Delete Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO - delete all messages user has sent in specific Chat
export const deleteMessagesByChatId = async (req, res) => {
    console.log("Delete All Messages");

    try{
        const {chatId} = req.params;
        await messageRepo.deleteAllMessagesQuery(userId, chatId);
        return res.status(200).json({ message: "Delete All Messages" });
    }
    catch(error){
        console.error("Error Delete All Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO - delete all messages user has sent in the app
export const deleteAllMessages = async (req, res) => {
    console.log("Delete All Messages");

    try{
        const {userId} = req.params;
        messageRepo.deleteAllMessagesQuery(userId, chatId);
        return res.status(200).json({ message: "Delete All Messages" });
    }
    catch(error){
        console.error("Error Delete All Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteMessage = async (req, res) => {
    console.log("Delete Message");

    try{
        const {messageId, chatId, userId} = req.params;

        await messageRepo.deleteMessageQuery(chatId, userId, messageId);
        return res.status(200).json({ message: "Delete Message" });
    }
    catch(error){
        console.error("Error Delete Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}