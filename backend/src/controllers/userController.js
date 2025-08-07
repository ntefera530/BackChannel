import pool from '../lib/db.js';

export const getUserProfile = async (req, res) => {
    try{
        return res.status(200).json({ message: "User Profile" });
    }
    catch(error){
        console.error("Error User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUsername = async (req, res) => {
    try{
        return res.status(200).json({ message: "User Profile" });
    }
    catch(error){
        console.error("Error User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfilePicture = async (req, res) => {
    try{
        return res.status(200).json({ message: "User Profile" });
    }
    catch(error){
        console.error("Error User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUserProfile = async (req, res) => {
    try{
        return res.status(200).json({ message: "User Profile" });
    }
    catch(error){
        console.error("Error User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
