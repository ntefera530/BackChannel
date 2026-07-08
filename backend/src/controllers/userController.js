import * as userRepo from '../models/userModel.js'
import bcrypt from 'bcryptjs';


export const getDeletionSettings = async (req, res) => {
    try{
        const userId = req.user.userId;
        const delete_time_seconds = await userRepo.getUserDeletionSettings(userId);

        return res.status(200).json(delete_time_seconds);
    }
    catch(error){
        console.error("Error Getting User Deletion Settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfilePictureUrl = async (req, res) => {
    try{
        const currentUserId = req.user.userId;
        const {userId} = req.params;
        
        const profilePictureUrl = await userRepo.getProfilePictureUrl(userId);
        if (!profilePictureUrl) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ profilePictureUrl: profilePictureUrl.profile_picture_url });
    }
    catch(error){
        console.error("Error Getting Profile Picture Url:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateDeletionSettings = async (req, res) => {
    try{
        const userId = req.user.userId;
        const delete_time_seconds = req.body.deleteTimerSeconds;

        await userRepo.updateUserDeletionSettings(userId, delete_time_seconds);
        return res.status(200).json({message: "Delete Timer Updated", delete_time_seconds});
    }
    catch(error){
        console.error("Error Updating User Deletion Settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const updateUsername = async (req, res) => {
    try{
        const userId = req.user.userId;
        const newUsername = req.body.newUsername;

        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }

        let result = await userRepo.getUserProfileByUsername(newUsername);
        if(result){
            return res.status(400).json({ message: "Username already Taken"});
        }

        await userRepo.updateUsername(userId, newUsername);
        return res.status(200).json({ message: "Username Updated" });
    }
    catch(error){
        console.error("Error Updating Username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updatePassword = async (req, res) => {
    try{
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }

        if(!newPassword || newPassword.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await userRepo.getUserProfileById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Incorrect Password" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userRepo.updatePassword(userId, hashedPassword);
        return res.status(200).json({ message: "Password Updated" });
    }
    catch(error){
        console.error("Error Updating Password:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const updateProfilePictureUrl = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {newImageUrl} = req.body;

        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }

        await userRepo.updateProfilePictureUrl(userId, newImageUrl);
        return res.status(200).json({message: "Profile Pic Updated"});
    }
    catch(error){
        console.error("Error Updating Profile Pic:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const updateBio = async (req, res) => {
    try{
        const userId = req.user.userId;
        const { newBio } = req.body;
 
        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }
 
        await userRepo.updateBio(userId, newBio);
        return res.status(200).json({ message: "Bio Updated" });
    }
    catch(error){
        console.error("Error in Update Bio:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}


export const deleteAccount = async (req, res) => {
    try{
        const userId = req.user.userId;

        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }

        //TODO - verify proper DB cascade deletion setup
        await userRepo.deleteUserAccount(userId);
        return res.status(200).json({ message: "User Profile Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

export const deleteAllMessagesFromUser = async (req, res) => {
    try{
        const userId = req.user.userId;

        if(!userId){
            return res.status(400).json({ message: "Invalid JWT" });
        }

        //TOOO verify decision before executing
        await userRepo.deleteAllMessagesFromUser(userId);

        return res.status(200).json({ message: "All User Messages Deleted" });
    }
    catch(error){
        console.error("Error Deleting All User Messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }    
}
