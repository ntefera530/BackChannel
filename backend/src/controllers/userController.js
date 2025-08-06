import pool from '../lib/db.js';

export const addFriend = async (req, res) => {
    console.log("Add Friend")

    try{
        const userId = req.userId;
        const friendId = req.params.friendId;
        
        console.log(`User ${userId} wants to add ${friendId}`);

        //2 Way Relationship
        await pool.query('INSERT INTO "Friendships" (user_id, friend_id) VALUES ($1, $2)', [userId, friendId]);
        await pool.query('INSERT INTO "Friendships" (user_id, friend_id) VALUES ($2, $1)', [userId, friendId]);

        return res.status(200).json({ message: "Friend Added" });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const addGroup = async (req, res) => {
    console.log("Add Group")

    try{
        return res.status(200).json({ message: "Group Added" });
    }
    catch(error){
        console.error("Error Adding Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const getFreindsList = async (req, res) => {
    console.log("Get Friends")

    try{
        return res.status(200).json({ message: "Got Friends - Change THis" });
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getGroups = async (req, res) => {
    console.log("Get Group")

    try{
        return res.status(200).json({ message: "Got Group - Change THis" });
    }
    catch(error){
        console.error("Error Getting Group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}