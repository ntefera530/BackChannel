import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getChats();
    }, []);

    const getChats = async () => {
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:5001/api/v1/chats/me");
          console.log(res.data)
          setChats(res.data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const createGroupChat = async (name) => {
        setLoading(true);
        try {
          const res = await axios.post("http://localhost:5001/api/v1/chats/me",{
            name: name,
            isGroup: true,
          });
          console.log(res.data)
          setChats(res.data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }
  
    return (
      <ChatsContext.Provider value={{ chats, getChats, createGroupChat, loading }}>
        {children}
      </ChatsContext.Provider>
    );
}
  
// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}