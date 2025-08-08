import { deleteUserProfileQuery, getUserProfileByIdQuery, getUserProfileByUsernameQuery ,updateProfilePictureQuery, updateUsernameQuery} from '../models/userModel.js'

export const getUserProfile = async (req, res) => {
    try{
        const username = req.params.username;

        const currentUser = await getUserProfileByUsernameQuery(username);
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

        await updateUsernameQuery(userId, newUsername);
        return res.status(200).json({ message: "Username Updated" });
    }
    catch(error){
        console.error("Error in Update Username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfilePicture = async (req, res) => {
    try{
        const userId = req.userId;
        const newPictureUrl = req.params.newPictureUrl;

        if(!userId){
            res.status(400).json({ message: "Invalid JWT" });
        }

        await updateProfilePictureQuery(userId, newPictureUrl);
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

        await deleteUserProfileQuery(userId);
        return res.status(200).json({ message: "User Profile Deleted" });
    }
    catch(error){
        console.error("Error Deleting User Profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
