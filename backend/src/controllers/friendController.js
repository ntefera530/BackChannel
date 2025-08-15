import { normalizeFriendship } from '../lib/utils.js';
import {deleteFriendQuery, addFriendQuery, getAllFriendsQuery} from "../models/friendModel.js"
import { getUserIdByUsernameQuery } from "../models/userModel.js" 

export const addFriend = async (req, res) => {
    try{
        console.log(`Enter AddFreind Controller`);
        const userId = req.user.userId;
        const username = req.user.username;

        const friendUsername = req.params.friendUsername;
        const friendObject = await getUserIdByUsernameQuery(friendUsername);

        if(!friendObject || friendObject.length === 0){
            return res.status(404).json({message: "user not found"});
        }

        const friendId = friendObject[0].id;

        console.log(friendId);
        
        console.log(`User ${userId} wants to add ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        //console.log(normal);
        await addFriendQuery(normal.user_id, normal.friend_id);

        return res.status(200).json({ message: "Friend Added" });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const deleteFriend = async (req, res) => {
    try{
        const userId = req.user.userId;
        const username = req.user.username;
        const friendUsername = req.params.friendUsername;
        const friendObject = await getUserIdByUsernameQuery(friendUsername);
        if(!friendObject || friendObject.length === 0){
            return res.status(404).json({message: "user not found"});
        }
        const friendId = friendObject[0].id;
        
        console.log(`User ${userId} wants to delete ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        await deleteFriendQuery(normal.user_id, normal.friend_id);
        return res.status(200).json({ message: "Friend Deleted" });
    }
    catch(error){
        console.error("Error Deleting Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    } 
}

export const getAllFriends = async (req, res) => {
    try{
        console.log("Get all Friends");
        const userId = req.user.userId;
        const username = req.user.username;


        const friendsList = await getAllFriendsQuery(userId);
        //console.log(friendsList);       
        
        return res.status(200).json(friendsList);
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}