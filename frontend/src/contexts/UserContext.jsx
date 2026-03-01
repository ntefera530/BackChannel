import { useEffect } from 'react';
import { useContext, createContext, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { login, signup, logout, checkAuth, getUserSettings } from '../api/userApi';

const UserContext = createContext();

export default function UserProvider({children}){
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [deleteTimerSeconds, setDeleteTimerSeconds] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      downloadProfilePicture(userId);
      checkAuth();
    }, [username, userId, profileImageUrl]);

    useEffect(() => {
      getUserSettings();
      console.log("Delete timer seconds in context: ", deleteTimerSeconds);
    }, [deleteTimerSeconds]);

    const handleLogin = async (username, password) => {
      const response = await login(username, password);
      
      if(!response.success){
        console.log("Login failed: ", response.error);
        return;
      }
      setUsername(response.username);
      setUserId(response.userId);

      navigate("/home");   
    }

    const handleSignup = async (username, password) => {
      const response = await signup(username, password);
      if(!response.success){
        console.log("Signup failed: ", response.error);
        return;
      }

      setUsername(response.username);
      setUserId(response.userId);

      navigate("/home");
    }

    const handleLogout = async () => {
      await logout();
      setUsername(null);
      setUserId(null);
      navigate("/");
    }

    const handleAuthentication = async () => {
      const response = await checkAuth();  

      if(!response.success){
        console.log("Check auth failed: ", response.error);
        setUsername(null);
        setUserId(null);
        navigate("/login");
      }

      setUsername(response.data.authUser.username);
      setUserId(response.data.authUser.userId);
    }

    const handleGetUserSettings = async () => {
      const response = await getUserSettings();
      if(!response.success){
        console.log("Get user settings failed: ", response.error);    
        return;
      }
      setDeleteTimerSeconds(response.data.deleteTimerSeconds);
    }

    // ----------------- Refarctor API calls to use these handlers instead of calling API directly in components -----------------
    const login = async (username, password) => {
      try {
        setLoading(true);
        console.log("Login Start")
        const response = await axios.post('http://localhost:5001/api/v1/auth/login', {username,password}, {
          withCredentials: true
        });
        console.log(" Login End")      
        setUsername(response.username);
        setUserId(response.userId);
        if(response.status === 200){
          navigate("/home");
        }
        
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        console.log("ERROR in USER CONTEXT");
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    };

    const signup = async (username, password) => {
      try {
        setLoading(true);
        console.log("Signup Start")
        const response = await axios.post('http://localhost:5001/api/v1/auth/signup', {username,password}, {
          withCredentials: true
        });
        console.log("Signup End")      
        setUsername(response.username);
        setUserId(response.userId);
        if(response.status === 200){
          navigate("/home");
        }
        
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Signup failed';
        console.log("ERROR in USER CONTEXT");
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    };

    const logout = async () => {
      try {
        setLoading(true);
        console.log("UserContext.js - Logout");
        const response = await axios.post('http://localhost:5001/api/v1/auth/logout');    
        setUsername(null);
        setUserId(null);
        navigate("/");
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Logout failed';
        console.log("ERROR in USER CONTEXT");
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    };

    const checkAuth = async () => {
      console.log("UserContext.js - starting check Auth");
        try{
            setLoading(true);
            console.log("UserContext.js - checkAuth");

            const response = await axios.post('http://localhost:5001/api/v1/auth/me'); 
            const authUsername = response.data.authUser.username;
            const authUserId = response.data.authUser.userId;

            setUsername(authUsername);
            setUserId(authUserId);
            console.log("UserContext.js -Auth Username + ID: ",username, userId);
        }
        catch(error){
            console.log('Error checking inital auth: ', error);
            if(error.response?.status === 401){
                console.log('JWT Expired - please log back in');
                setUsername(null);
                setUserId(null);  
            }
            navigate("/login")
        }finally{
            setLoading(false);
        }
    };

    const getUserSettings = async () => {
      console.log("Getting User Settings for user: ", userId);
        try{
          const response = await axios.get('http://localhost:5001/api/v1/users/me/settings', {
            withCredentials: true
          });
          console.log("User settings response: -------------------->>>>", response.data);
          setDeleteTimerSeconds(response.data.delete_timer_seconds);
        }
        catch(error){
          console.log('Error getting user settings: ', error);
        }finally{
          console.log("Finished getting user settings");
          setLoading(false);
        }
    }

    const updateUserSettings = async (newDeleteTimerSeconds) => {
      try {
        setLoading(true);
        console.log("Updating user settings for user: ", userId);
        const response = await axios.put('http://localhost:5001/api/v1/users/me/settings', {
          deleteTimerSeconds: newDeleteTimerSeconds
        }, {
          withCredentials: true
        });
        setDeleteTimerSeconds(response.data.deleteTimerSeconds);
      } catch (error) {
        console.log('Error updating user settings: ', error);
      } finally {
        setLoading(false);
      }
    }



    //--------------------------------------------------
    const uploadProfilePicture = async (file) => {
      try {
        setLoading(true);
        console.log("profile upload Start")
        console.log("File to upload: ", file);

        console.log(window.location.origin)

        const response = await axios.get('http://localhost:5001/api/v1/uploads/profile/upload-url', {
          params: { fileType: file.type },
          withCredentials: true
        });
        console.log(" profile upload End")  
        
        const { uploadUrl, key } = response.data;
        console.log("upload URL: ", uploadUrl);
        console.log("Key for S3: ", key);

        // Upload the file to S3
        await axios.put(uploadUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });

        console.log(" Put file to S3 successful")

        //Save the key to the user profile
        await axios.put('http://localhost:5001/api/v1/users/me/profilePicture', { newProfileImage: key }, {  
          withCredentials: true
        });

        console.log(" Save profile picture key to user profile successful")
        
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        console.log("ERROR in USER CONTEXT");
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    };

    const downloadProfilePicture = async (userId) => {
      try {
        setLoading(true);
        console.log("Fetching profile picture URL");

        // First, get the profile picture key from your backend
        const userResponse = await axios.get(`http://localhost:5001/api/v1/users/${userId}/profilePicture`, {
          withCredentials: true,
       });
       
      console.log("Profile picture key response: ", userResponse.data);
      const unsignedUrl = userResponse.data.profilePictureUrl.profile_picture_url; // assuming your backend returns the S3 key
       console.log("Profile picture key: ", unsignedUrl);
      if (!unsignedUrl) {
        console.log("No profile picture set");
        setProfileImageUrl(null);
        return;
      }

      // Then, get the signed download URL for that key
      const downloadResponse = await axios.get(
        'http://localhost:5001/api/v1/uploads/profile/download-url',
        {
          params: { key: unsignedUrl },
          withCredentials: true,
        }
      );

      const signedUrl = downloadResponse.data.signedUrl;
      setProfileImageUrl(signedUrl);
      //console.log("Profile picture URL set:", signedUrl);

      } catch (err) {
        console.error("Error fetching profile picture:", err);
        setProfileImageUrl(null);
      } finally {
      setLoading(false);
      }
    };

    const deleteAllUserMessages = async () => {
        console.log("Delete all messages for user: ", userId);
        try {
          setLoading(true);
          const response = await axios.delete('http://localhost:5001/api/v1/users/me/messages', {
            withCredentials: true
          });
          console.log("Delete messages response: ", response.data);
        } catch (err) {          const errorMessage = err.response?.data?.message || 'Delete messages failed';
          console.log("ERROR in USER CONTEXT - deleteAllUserMessages: ", errorMessage);
        } finally {
          setLoading(false);
        }
    }


    return (
        <UserContext.Provider value={{username,userId, login, logout, deleteTimerSeconds, updateUserSettings, setDeleteTimerSeconds, downloadProfilePicture, uploadProfilePicture, deleteAllUserMessages, profileImageUrl}}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook (named export)
export function useUser() {
  return useContext(UserContext);
}