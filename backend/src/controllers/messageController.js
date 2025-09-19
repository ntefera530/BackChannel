import pool from '../lib/db.js';
import {getMessagesQuery, deleteMessageQuery, deleteAllMessagesQuery} from "../models/messageModel.js"

export const getMessages = async (req, res) => {
    console.log("get Messages");

    try{

        const userId = req.user.userId;
        const {chatId} = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;


        const messages = await getMessagesQuery(chatId, limit, offset);
        return res.status(200).json({ messages });
    }
    catch(error){
        console.error("Error Getting Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteMessage = async (req, res) => {
    console.log("Delete Message");

    try{
        const {messageId, chatId, userId} = req.params;

        deleteMessageQuery(chatId, userId, messageId);
        return res.status(200).json({ message: "Delete Message" });
    }
    catch(error){
        console.error("Error Delete Message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteAllMessages = async (req, res) => {
    console.log("Delete All Messages");

    try{
        const {chatId, userId} = req.params;
        deleteAllMessagesQuery(userId, chatId);
        return res.status(200).json({ message: "Delete All Messages" });
    }
    catch(error){
        console.error("Error Delete All Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}