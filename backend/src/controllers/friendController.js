import pool from '../lib/db.js';
import { normalizeFriendship } from '../lib/utils.js';

//Done
export const addFriend = async (req, res) => {
    console.log("Add Friend")

    try{
        //passed in from protectRoute
        //const userId = req.userId;

        //test user
        const userId = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        const friendId = req.params.friendId;
        
        console.log(`User ${userId} wants to add ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        console.log(normal);
        await pool.query('INSERT INTO "Friendships" (user_id, friend_id) VALUES ($2, $1)', [normal.user_id, normal.friend_id]);

        //2 Way Relationship
        //await pool.query('INSERT INTO "Friendships" (user_id, friend_id) VALUES ($1, $2)', [userId, friendId]);
        //await pool.query('INSERT INTO "Friendships" (user_id, friend_id) VALUES ($2, $1)', [userId, friendId]);

        return res.status(200).json({ message: "Friend Added" });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const deleteFriend = async (req, res) => {
    console.log("Add Friend")

    try{
        //passed in from protectRoute
        //const userId = req.userId;

        //test user
        const userId = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        const friendId = req.params.friendId;
        
        console.log(`User ${userId} wants to delete ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        //2 Way Relationship
        // await pool.query('DELETE FROM "Friendships" WHERE user_id = $1 AND friend_id = $2', [userId, friendId]);
        // await pool.query('DELETE FROM "Friendships" WHERE user_id = $1 AND friend_id = $2', [friendId, userId]);

        await pool.query('DELETE FROM "Friendships" WHERE user_id = $1 AND friend_id = $2', [normal.user_id, normal.friend_id]);

        return res.status(200).json({ message: "Friend Deleted" });
    }
    catch(error){
        console.error("Error Deleting Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export const getAllFriends = async (req, res) => {
    console.log("Get Friends")
    

    try{
        //const userId = req.userId;
        //const friends =await pool.query('SELECT friend_id FROM "Friendships" WHERE user_id= $1', [userId]);
        
        //Test Maual freinds
        const userId = '49a241f4-4e95-44ca-bbed-c13b60d83685';
        const friends = await pool.query('SELECT CASE WHEN user_id = $1 THEN friend_id ELSE user_id END AS friend_id FROM "Friendships" WHERE user_id = $1 OR friend_id = $1;', [userId]);

        console.log(friends.rows);

        return res.status(200).json(friends.rows);
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}