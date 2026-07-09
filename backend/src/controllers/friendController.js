import { normalizeFriendship } from '../lib/utils.js';
import * as friendRepo from "../models/friendModel.js"
import { getUserIdFromUsername } from "../models/userModel.js"

import { signUrl } from "./uploadController.js" 

export const getAllFriends = async (req, res) => {
    try{
        const userId = req.user.userId;

        const friendsList = await friendRepo.getAllFriends(userId); 

        const signedFriendsList = await Promise.all(
            friendsList.map(async (friend) => ({
                ...friend,
                profile_picture_url: await signUrl(friend.profile_picture_url),
            }))
        );

        return res.status(200).json(signedFriendsList);
    }
    catch(error){
        console.error("Error Getting Friends:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const addFriend = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {friendUsername} = req.body;

        const friend = await getUserIdFromUsername(friendUsername);
        if (!friend) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendId = friend.id;
        if (friendId === userId) {
            return res.status(400).json({ message: "Cannot add yourself as a friend" });
        }

        const normal = normalizeFriendship(userId, friendId);
        const added = await friendRepo.addFriend(normal.user_id, normal.friend_id);
        if (added.length === 0) {
            return res.status(409).json({ message: "Already friends" });
        }

        return res.status(201).json({ message: "Friend Added", username: friendUsername });
    }
    catch(error){
        console.error("Error Adding Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteFriend = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {friendUsername} = req.body;

        const friend = await getUserIdFromUsername(friendUsername);
        if (!friend) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendId = friend.id;

        const normal = normalizeFriendship(userId, friendId);
        const deleted = await friendRepo.deleteFriend(normal.user_id, normal.friend_id);
        if (deleted.length === 0) {
            return res.status(404).json({ message: "You are not friends with this user" });
        }

        return res.status(200).json({ message: "Friend Deleted", username: friendUsername });
    }
    catch(error){
        console.error("Error Deleting Friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
