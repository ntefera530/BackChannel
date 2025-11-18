import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

const MessageContext = createContext();


export default function MessageProvider({ children }) {
    const [selectedChatId, setSelectedChatId] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    const limit = 10;
  
    useEffect(() => {
      
    }, []);
 
    const changeSelectedChatId = async (chatId) => {
        setLoading(true);
        try {
            setSelectedChatId(chatId)
            //console.log(selectedChatId);
            getDirectMessagesByFriendId(chatId);
        } catch (err) {
            console.error("Error Changing Chat Id:", err);
        } 
    }

    const getDirectMessagesByFriendId = async (friendId) => {
        setLoading(true);

        try {
            console.log("1")
          const res = await axios.get(`http://localhost:5001/api/v1/chats/me/${friendId}`);
            console.log("2")

          const data = res.data
                      console.log("3")
          const chatId = data.json();
          console.log("chatId (might be null: ", res);

          const res2 = await axios.get(`http://localhost:5001/api/v1/messages/me/${chatId}`, {
                params: {limit, offset},
          });
                      console.log("25")


          console.log(res, "and", res2)
          setMessages(res2)
          
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    return (
      <MessageContext.Provider value={{ selectedChatId, changeSelectedChatId, messages, setOffset, getDirectMessagesByFriendId, loading }}>
        {children}
      </MessageContext.Provider>
    );
  }
  
// Custom hook (named export)
export function useMessages() {
  return useContext(MessageContext);
}