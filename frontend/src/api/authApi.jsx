import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', {username,password});
    return response;  
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Login failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
  
};

export const signup = async (username, password) => {
  try {
    const response = await api.post('/api/v1/auth/signup', {username,password});

    return response; 

  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Signup failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/v1/auth/logout');    
    return response;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Logout failed';
    console.log("ERROR in USER CONTEXT");
    return { success: false, error: errorMessage };
  }
};

export const checkAuth = async () => {
  try{
    const response = await api.post('/api/v1/auth/me'); 
    return response;
  }
  catch(error){
    console.log("ERROR in checkAuth");
    const errorMessage = error.response?.data?.message || 'Check auth failed';
    return { success: false, error: errorMessage }; 
  }
};
