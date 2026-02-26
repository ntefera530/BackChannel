import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useWebSocket } from "./WebSocketContext";
import {useUser} from '../contexts/UserContext';
const ChatsContext = createContext();
import { v4 as uuidv4 } from 'uuid'; // Import v4 for random UUIDs

import { format } from 'date-fns';

export default function ChatsProvider({ children }) {
    const wsRef = useWebSocket();
    const {userId} = useUser(); //my User Context

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChatId, setSelectedChatId] = useState(null);


    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);


    const [offset, setOffset] = useState(0);
    const limit = 10;
  
    useEffect(() => {
      getChats();

      //Recieve Messages - must be inside useEffect to mount only once
      const ws = wsRef.current;
      if(!ws){
        console.error("WebSocket not connected");
        return;
      }

      const recieveMessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("Received WS message:", messageData); 
        setMessages(messages => [...messages, messageData]);
      };


      ws.addEventListener('message', recieveMessage);

      return () => {
        ws.removeEventListener('message', recieveMessage);
      }

    }, [wsRef, selectedChatId]);

    //SEND Message
    const sendMessage = (content) => {
      const ws = wsRef.current;
      if(!ws){
        console.error("WebSocket not connected");
        return;
      }

      const now = new Date();
      

      // Send formattedTimestamp to your backend API

      const message = {
        type: 'sendMessageToUser',
        id: uuidv4(),
        content: content, 
        sender_id: userId,
        chat_id: selectedChatId,
        expire_at: now,
        sent_at: now
      }

      if(ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));

        //Add message locally for instant UI update
        //setMessages(messages => [...messages, message]);
      }
      else{
        //TODO: Handle reconnection logic
        console.log("WebSocket not open. Ready state:", ws.readyState);
      }
    }



    const getChats = async () => {
        setLoading(true);
        try {
          const res = await axios.get("http://localhost:5001/api/v1/chats?type=all");
          console.log(res.data)
          setChats(res.data);
        } catch (err) {
          console.error("Error fetching friends:", err);
        } finally {
          setLoading(false);
        }
    }

    const getChatParticipantsByChatId = async (selectedChatId) => {
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:5001/api/v1/chats/${selectedChatId}/participants`);

          //Get Signed URLs for each participant's profile picture
          console.log("Participants before fetching profile pictures:", res.data.participants);
          //setParticipants([...res.data.participants]);
          setParticipants(res.data.participants.map(p => ({ ...p })));
        } catch (err) {
          console.error("Error fetching participants:", err);
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

    const getMessagesByChatId = async (selectedChatId) => {
      setLoading(true);

      try {
        const res = await axios.get(`http://localhost:5001/api/v1/chats/${selectedChatId}/messages`);

        const res2 = await axios.get(`http://localhost:5001/api/v1/chats/${selectedChatId}/messages`, {
          params: {limit, offset},
        });


        console.log(res, "and", res2)
        setMessages(res2.data.messages);
          
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }  
    }

    return (
      <ChatsContext.Provider value={{ participants, chats, getChats, createGroupChat, loading, selectedChatId, setSelectedChatId, messages, getMessagesByChatId, sendMessage, getChatParticipantsByChatId }}>
        {children}
      </ChatsContext.Provider>
    );
}
  
// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}