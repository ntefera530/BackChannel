import { normalizeFriendship } from '../lib/utils.js';
import * as friendRepo from "../models/friendModel.js"
import { getUserIdByUsernameQuery } from "../models/userModel.js" 

export const addFriend = async (req, res) => {
    console.log('Add Friend');
    try{
        const userId = req.user.userId;
        const username = req.user.username;
        const {friendUsername} = req.body;

        const friendObject = await getUserIdByUsernameQuery(friendUsername);

        if(!friendObject || friendObject.length === 0){
            return res.status(404).json({message: "user not found"});
        }
        const friendId = friendObject[0].id;
        const normal = normalizeFriendship(userId, friendId);
        
        await friendRepo.addFriendQuery(normal.user_id, normal.friend_id);

        return res.status(200).json({ message: "Friend Added", username: friendUsername });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
}

export const deleteFriend = async (req, res) => {
    try{
        console.log('Delete Friend');
        const userId = req.user.userId;
        const username = req.user.username;
        const {friendUsername} = req.body;
        console.log(`User ${username} wants to delete friend with username: ${friendUsername}`);

        const friendObject = await getUserIdByUsernameQuery(friendUsername);
        if(!friendObject || friendObject.length === 0){
            return res.status(404).json({message: "user not found"});
        }
        const friendId = friendObject[0].id;
        
        console.log(`User ${userId} wants to delete ${friendId}`);
        const normal = normalizeFriendship(userId, friendId);

        await friendRepo.deleteFriendQuery(normal.user_id, normal.friend_id);
        return res.status(200).json({ message: "Friend Deleted", username: friendUsername });
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


        const friendsList = await friendRepo.getAllFriendsQuery(userId);
        console.log(friendsList);       
        
        return res.status(200).json(friendsList);
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

