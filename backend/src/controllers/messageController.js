import pool from '../lib/db.js';

export const getMessages = async (req, res) => {
    console.log("get Messages");

    try{

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

        return res.status(200).json({ message: "Delete All Messages" });
    }
    catch(error){
        console.error("Error Delete All Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}