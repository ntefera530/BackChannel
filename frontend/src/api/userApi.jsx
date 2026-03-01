import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5001/api/v1/auth/login', {username,password}, {
      withCredentials: true
    });

    return response;  

  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Login failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
  
};

export const signup = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5001/api/v1/auth/signup', {username,password}, {
      withCredentials: true
    });

    return response; 

  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Signup failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/v1/auth/logout');    
    
    return response;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Logout failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
};

export const checkAuth = async () => {
  try{
    console.log("UserContext.js - checkAuth");
    const response = await axios.post('http://localhost:5001/api/v1/auth/me'); 

    return response;
  }
  catch(error){
    console.log("ERROR in checkAuth");
    const errorMessage = error.response?.data?.message || 'Check auth failed';
    return { success: false, error: errorMessage }; 
  }
};

export const getUserSettings = async () => {
  try{
    const response = await axios.get('http://localhost:5001/api/v1/users/me/settings', {
      withCredentials: true
    });
    return response;
  }
  catch(error){
    console.log('Error getting user settings: ', error);
    return { success: false, error: error.response?.data?.message || 'Failed to get user settings' };
  }
} 