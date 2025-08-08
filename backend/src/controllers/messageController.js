import pool from '../lib/db.js';
import {getMessages, deleteMessage, deleteAllMessages} from "../model/messageModel.js"

export const getMessages = async (req, res) => {
    console.log("get Messages");

    try{

        const {chatId, limit, offset} = req.params;
        //test user
        const userId = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        getMessages(chatId, limit, offset);
        return res.status(200).json({ message: "Got Messages" });
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

        // const userId2 = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        deleteMessage(chatId, userId, messageId);
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
        deleteAllMessages(userId, chatId);
        return res.status(200).json({ message: "Delete All Messages" });
    }
    catch(error){
        console.error("Error Delete All Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}