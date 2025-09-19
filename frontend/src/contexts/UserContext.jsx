import { useEffect } from 'react';
import { useContext, createContext, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const UserContext = createContext();

export default function UserProvider({children}){
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, [username, userId]);

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
    }

    return (
        <UserContext.Provider value={{username,userId, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook (named export)
export function useUser() {
  return useContext(UserContext);
}