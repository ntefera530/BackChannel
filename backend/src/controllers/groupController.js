import pool from '../lib/db.js';

export const addGroup = async (req, res) => {
    try{
        return res.status(200).json({ message: "Group Added" });
    }
    catch(error){
        console.error("Error Adding Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const deleteGroup = async (req, res) => {
    try{
        return res.status(200).json({ message: "Group Deleted" });
    }
    catch(error){
        console.error("Error Deleting Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const getAllGroups = async (req, res) => {
    console.log("Get Group")

    try{
        return res.status(200).json({ message: "Got Group - Change THis" });
    }
    catch(error){
        console.error("Error Getting Groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}