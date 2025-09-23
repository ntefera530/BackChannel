import * as userRepo from '../models/userModel.js'

export const getUserProfile = async (req, res) => {
    try{
        const username = req.params.username;

        const currentUser = await userRepo.getUserProfileByUsernameQuery(username);
        console.log(currentUser)
        return res.status(200).json(currentUser);
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
        const userId = req.userId;
        const newPictureUrl = req.params.newPictureUrl;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.updateProfilePictureQuery(userId, newPictureUrl);
        return res.status(200).json({message: "Profile Pic Updated"});
    }
    catch(error){
        console.error("Error in Update Profile Pic:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteUserProfile = async (req, res) => {
    try{
        const userId = req.userId;

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
        const userId = req.userId;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.deleteAllUserMessagesQuery(userId);
        return res.status(200).json({ message: "User Profile Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
