import pool from '../lib/db.js';

export const createChat = async (req, res) => {
    try{
        return res.status(200).json({ message: "Group Added" });
    }
    catch(error){
        console.error("Error Adding Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteChat = async (req, res) => {
    try{
        return res.status(200).json({ message: "Group Deleted" });
    }
    catch(error){
        console.error("Error Deleting Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const getAllChats = async (req, res) => {
    console.log("Get Group")

    try{
        return res.status(200).json({ message: "Got Group - Change THis" });
    }
    catch(error){
        console.error("Error Getting Groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const leaveChat = async (req, res) => {
    console.log("Leave Group")

    try{
        return res.status(200).json({ message: "Leave Group - Change THis" });
    }
    catch(error){
        console.error("Error Leave Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const inviteToChat = async (req, res) => {
    console.log("Invite To Group")

    try{
        return res.status(200).json({ message: "Invite To Group" });
    }
    catch(error){
        console.error("Error Invite To Groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const kickFromChat = async (req, res) => {
    console.log("Kick From Group")

    try{
        return res.status(200).json({ message: "Kick From Group" });
    }
    catch(error){
        console.error("Error Kick From Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}