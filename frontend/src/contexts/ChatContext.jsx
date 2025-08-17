import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {

    }, []);
  
    return (
      <ChatsContext.Provider value={{ chats, setChats, loading }}>
        {children}
      </ChatsContext.Provider>
    );
}
  
// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}