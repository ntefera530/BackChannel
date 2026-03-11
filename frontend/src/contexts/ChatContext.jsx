import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useWebSocket } from "./WebSocketContext";
import {useUser} from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid'; // Import v4 for random UUIDs
import * as chatApi from '../api/chatApi';


const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
    const { socketRef: wsRef, wsReady } = useWebSocket();
    const {userId, deleteTimerSeconds} = useUser(); //my User Context

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChatId, setSelectedChatId] = useState(null);


    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);



    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);

    const selectedChatIdRef = useRef(selectedChatId);
    const loadingMoreRef = useRef(false);

    // Initial load when chat is selected
    useEffect(() => {
      if (selectedChatId) {
        setMessages([]);
        setOffset(0);
        setHasMore(true);
        handleGetChatMessages(selectedChatId, limit, 0);
      }
    }, [selectedChatId]);

    useEffect(() => { handleGetChats(); }, []);

    useEffect(() => {
      selectedChatIdRef.current = selectedChatId;
    }, [selectedChatId]);

    useEffect(() => {
      const ws = wsRef.current;
      if (!ws) return;
      const recieveMessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("Received WS message:", messageData);
        if (messageData.chat_id === selectedChatIdRef.current) {
          setMessages(messages => {
            // Prevent duplicates: optimistic message was already added locally by the sender
            if (messages.some(m => m.id === messageData.id)) return messages;
            return [...messages, messageData];
          });
        }
      };
      ws.addEventListener('message', recieveMessage);
      return () => ws.removeEventListener('message', recieveMessage);
    }, [wsReady]); // re-subscribe whenever a fresh socket connection opens

    const loadMoreMessages = () => {
        if (!hasMore) return Promise.resolve();
        loadingMoreRef.current = true; // ← set ref
        const newOffset = offset + limit;
        setOffset(newOffset);
        return handleGetChatMessages(selectedChatId, limit, newOffset);
    }

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
        setMessages(messages => [...messages, message]);
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
        setParticipants(response.data.participants);
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
        const response = await chatApi.getMessagesByChatId(selectedChatId, limit, offset);
        const newMessages = response.data.messages.reverse(); // ← reverse to get oldest first

        if(newMessages.length < limit){
          setHasMore(false);
        }
        if(offset === 0){
          setMessages(newMessages);
        }
        else{
          setMessages(prev => [...newMessages, ...prev]); // ← prepend older messages
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        loadingMoreRef.current = false; // ← reset ref
      }
    }

    return (
      <ChatsContext.Provider value={{ participants, chats, loading, selectedChatId, messages, hasMore, loadingMoreRef,
                                      handleGetChats, handleGetChatParticipants, handleCreateGroupChat, handleGetChatMessages,
                                      setSelectedChatId, sendMessage, loadMoreMessages}}>
        {children}
      </ChatsContext.Provider>
    );
}
  
// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}