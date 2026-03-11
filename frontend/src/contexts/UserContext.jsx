import { useEffect } from 'react';
import { useContext, createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

//TODo - delete this
import axios from 'axios';
axios.defaults.withCredentials = true;
//-------------------

import * as userApi from '../api/userApi';
import * as authApi from '../api/authApi';
import * as storageApi from '../api/storageApi';

const UserContext = createContext();

export default function UserProvider({children}){
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [deleteTimerSeconds, setDeleteTimerSeconds] = useState(null);

    const navigate = useNavigate();

    useEffect(() => { handleAuthentication(); }, []);

    useEffect(() => { 
        if (userId){
          handleProfilePictureDownload();
          handleGetUserSettings(); 
        }
    }, [userId]);

    const handleLogin = async (username, password) => {
      const response = await authApi.login(username, password);
      console.log("Login response: ", response);
      if(!response.status || response.status !== 200){
        console.log("Login failed: ", response.error);
        return;
      }
      setUsername(response.username);
      setUserId(response.userId);
      navigate("/home");   
    }

    const handleSignup = async (username, password) => {
      const response = await authApi.signup(username, password);
      if(!response.success){
        console.log("Signup failed: ", response.error);
        return;
      }
      setUsername(response.username);
      setUserId(response.userId);
      navigate("/home");
    }

    const handleLogout = async () => {
      const response = await authApi.logout();
      if(!response.status || response.status !== 200){
        console.log("Logout failed: ", response.error);
        return;
      }
      setUsername(null);
      setUserId(null);
      navigate("/");
    }

    const handleAuthentication = async () => {
      try{
        setLoading(true);
        const response = await authApi.checkAuth();  

        if(!response.status || response.status !== 200){
          console.log("Check auth failed: ", response.error);
          setUsername(null);
          setUserId(null);
          navigate("/login");
          return;
        }

        setUsername(response.data.authUser.username);
        setUserId(response.data.authUser.userId);
        }
      catch(err){
        console.log("Error during authentication check: ", err);
        setUsername(null);
        setUserId(null);
        navigate("/login");
      }finally{
        setLoading(false);
      }
    }
    
    const handleUpdateUserSettings = async (newDeleteTimerSeconds) => {
      const response = await userApi.updateUserSettings(newDeleteTimerSeconds);
      if(!response.status || response.status !== 200){
        console.log("Update user settings failed: ", response.error);    
        return;
      }
      setDeleteTimerSeconds(response.data.deleteTimerSeconds);
    }

    const handleGetUserSettings = async () => {
      const response = await userApi.getUserSettings();
      if(!response.status || response.status !== 200){
        console.log("Get user settings failed: ", response.error);    
        return;
      }
      setDeleteTimerSeconds(response.data.deleteTimerSeconds);
    }

    const handleProfilePictureUpload = async (file) => {
        try {
            const key = await storageApi.uploadProfilePicture(file);
            await userApi.updateProfilePicture(key); // ← save key to DB
            await handleProfilePictureDownload();    // ← refresh the displayed picture
        } catch (err) {
            console.error("Profile picture upload failed:", err);
        }
    }

    const handleProfilePictureDownload = async () => {
      try {
          setLoading(true);
          console.log("attempting to fetch profile picture for userId: ", userId);
          const signedUrl = await storageApi.getProfilePicture(userId);
          //console.log("Fetched signed URL for profile picture: ", signedUrl);
          setProfileImageUrl(signedUrl);
      } catch (err) {
          console.error("Error fetching profile picture:", err);
          setProfileImageUrl(null);
      } finally {
          setLoading(false);
      }
    }

    const deleteAllUserMessages = async () => {
        console.log("Delete all messages for user: ", userId);
        try {
          setLoading(true);
          const response = await axios.delete('http://localhost:5001/api/v1/users/me/messages', {
            withCredentials: true
          });
          console.log("Delete messages response: ", response.data);
        } catch (err) {          
          const errorMessage = err.response?.data?.message || 'Delete messages failed';
          console.log("ERROR in USER CONTEXT - deleteAllUserMessages: ", errorMessage);
        } finally {
          setLoading(false);
        }
    }


    return (
        <UserContext.Provider value={{username, userId, profileImageUrl, deleteTimerSeconds, loading,
                                      handleLogin, handleSignup, handleLogout, handleAuthentication, 
                                      handleGetUserSettings, handleUpdateUserSettings, 
                                      handleProfilePictureUpload,  handleProfilePictureDownload,
                                      setDeleteTimerSeconds, deleteAllUserMessages,}}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook (named export)
export function useUser() {
  return useContext(UserContext);
}