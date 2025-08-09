import { normalizeFriendship } from '../lib/utils.js';
import {deleteFriendQuery, addFriendQuery, getAllFriendsQuery} from "../models/friendModel.js"

export const addFriend = async (req, res) => {
    try{
        const userId = req.userId;
        const friendId = req.params.friendId;
        
        console.log(`User ${userId} wants to add ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        console.log(normal);
        addFriendQuery(normal.user_id, normal.friend_id);

        return res.status(200).json({ message: "Friend Added" });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const deleteFriend = async (req, res) => {
    try{
        const userId = req.userId;
        const friendId = req.params.friendId;
        
        console.log(`User ${userId} wants to delete ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        deleteFriendQuery(normal.user_id, normal.friend_id);
        return res.status(200).json({ message: "Friend Deleted" });
    }
    catch(error){
        console.error("Error Deleting Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
}

export const getAllFriends = async (req, res) => {
    try{
        const userId = req.userId;
        const friendsList = getAllFriendsQuery(userId);
        
        return res.status(200).json(friendsList);
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}