import * as userRepo from '../models/userModel.js'

export const getUserProfile = async (req, res) => {
    try{
        const username = req.params.username;

        const currentUser = await userRepo.getUserProfileByUsernameQuery(username);
        //console.log(currentUser)
        return res.status(200).json(currentUser);
    }
    catch(error){
        console.error("Error in Get User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserDeleteSettings = async (req, res) => {
    try{
        const userId = req.user.userId;

        const delete_time_seconds = await userRepo.getUserDeleteSettingsByUserIdQuery(userId);
        //console.log(currentUser)
        return res.status(200).json(delete_time_seconds);
    }
    catch(error){
        console.error("Error in Get User Delete Settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUserDeleteSettings = async (req, res) => {
    try{
        const userId = req.user.userId;
        const delete_time_seconds = req.body.deleteTimerSeconds;
        await userRepo.updateUserDeleteSettingsByUserIdQuery(userId, delete_time_seconds);
        //console.log(currentUser)
        return res.status(200).json({message: "Delete Timer Updated", delete_time_seconds});
    }
    catch(error){
        console.error("Error in Update User Delete Settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfilePictureUrl = async (req, res) => {
    console.log("Get Profile Picture URL controller called ----");
    try{
        const currentUserId = req.user.userId;
        const {userId} = req.params;
        //TODO - Add check to make sure userId is the same as currentUserId or that the userId belongs to a friend of the current user
        
        const profilePictureUrl = await userRepo.getProfilePictureUrlByIdQuery(userId);
        // console.log(profilePictureUrl)
        return res.status(200).json({ profilePictureUrl: profilePictureUrl.profile_picture_url });
    }
    catch(error){
        console.error("Error in Get User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUsername = async (req, res) => {
    try{
        const userId = req.userId;
        const newUsername = req.body.newUsername;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.updateUsernameQuery(userId, newUsername);
        return res.status(200).json({ message: "Username Updated" });
    }
    catch(error){
        console.error("Error in Update Username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePassword = async (req, res) => {
    try{
        const userId = req.userId;
        const newPassword = req.body.newPassword;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.updatePasswordQuery(userId, newPassword);
        return res.status(200).json({ message: "Password Updated" });
    }
    catch(error){
        console.error("Error in Update Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//TODO
export const updatBio = async (req, res) => {
}

//TODO Set up AWS
export const updateProfilePicture = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {newProfileImage} = req.body;

        console.log("Update Profile Picture - UserID: ", userId);
        console.log("Update Profile Picture - New Picture URL: ", newProfileImage);

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.updateProfilePictureQuery(userId, newProfileImage);
        return res.status(200).json({message: "Profile Pic Updated"});
    }
    catch(error){
        console.error("Error in Update Profile Pic:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUserProfile = async (req, res) => {
    try{
        const userId = req.user.userId;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.deleteUserProfileByIdQuery(userId);
        return res.status(200).json({ message: "User Profile Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteAllUserMessages = async (req, res) => {
    try{
        const userId = req.user.userId;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        //TODO: Fix this function in userRepo
        await userRepo.deleteAllMessagesByUserIdQuery(userId);
        return res.status(200).json({ message: "All User Messages Deleted" });
    }
    catch(error){
        console.error("Error Deleting All User Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllUserMessages = async (req, res) => {
    try{
        const userId = req.userId;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        //TODO: Fix this function in userRepo
        await userRepo.getAllUserMessagesQuery(userId);
        return res.status(200).json({ message: "User Profile Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}