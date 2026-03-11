import { createContext, useContext, useState, useEffect } from "react";
import { useWebSocket } from "./WebSocketContext";
import {useUser} from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid'; // Import v4 for random UUIDs
import * as chatApi from '../api/chatApi';


const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
    const wsRef = useWebSocket();
    const {userId, deleteTimerSeconds} = useUser(); //my User Context

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChatId, setSelectedChatId] = useState(null);


    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);


    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => { handleGetChats(); }, []);

    useEffect(() => {
      const ws = wsRef.current;
      if (!ws) return;
      const recieveMessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("Received WS message:", messageData); 
        if (messageData.chat_id === selectedChatId) {
          setMessages(messages => [...messages, messageData]);
        }
      };
      ws.addEventListener('message', recieveMessage);
      return () => ws.removeEventListener('message', recieveMessage);
    }, [wsRef]);
  
    // useEffect(() => {

    //   //Recieve Messages - must be inside useEffect to mount only once
    //   const ws = wsRef.current;
    //   if(!ws){
    //     console.error("WebSocket not connected");
    //     return;
    //   }

    //   const recieveMessage = (event) => {
    //     const messageData = JSON.parse(event.data);
    //     console.log("Received WS message:", messageData); 
    //     setMessages(messages => [...messages, messageData]);
    //   };


    //   ws.addEventListener('message', recieveMessage);

    //   return () => {
    //     ws.removeEventListener('message', recieveMessage);
    //   }

    // }, [wsRef, selectedChatId]);

    //SEND Message
    const sendMessage = (content) => {
      const ws = wsRef.current;
      if(!ws){
        console.error("WebSocket not connected");
        return;
      }

      // Send formattedTimestamp to your backend API

      const message = {
        type: 'sendMessageToUser',
        id: uuidv4(),
        content: content, 
        sender_id: userId,
        chat_id: selectedChatId,
        expire_at: new Date(Date.now() + deleteTimerSeconds * 1000),
        sent_at: new Date()
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

    const handleGetChats = async  () => {
      try {
        const response = await chatApi.getChats();
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    const handleGetChatParticipants = async  (selectedChatId) => {
      try {
        const response = await chatApi.getChatParticipantsByChatId(selectedChatId);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching chat participants:", error);
      }
    }

    const handleCreateGroupChat = async (name) => {
      try {
        const response = await chatApi.createGroupChat(name);
        setChats(response.data);
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }

    const handleGetChatMessages = async (selectedChatId, limit, offset) => {
      try {
        const response = await chatApi.getChatMessagesByChatId(selectedChatId, limit, offset);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    }

    return (
      <ChatsContext.Provider value={{ participants, chats, loading, selectedChatId, messages,
                                      handleGetChats, handleGetChatParticipants, handleCreateGroupChat, handleGetChatMessages,
                                      setSelectedChatId, sendMessage }}>
        {children}
      </ChatsContext.Provider>
    );
}
  
// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}