import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useWebSocket } from "./WebSocketContext";
import {useUser} from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid'; // Import v4 for random UUIDs
import * as chatApi from '../api/chatApi';
import * as storageApi from '../api/storageApi';

const ChatsContext = createContext();

export default function ChatsProvider({ children }) {
    const { socketRef: wsRef, wsReady } = useWebSocket();
    const {userId, deleteTimerSeconds} = useUser(); //my User Context

    const [groupChats, setGroupChats] = useState([]);
    const [directMessages, setDirectMessages] = useState([]);

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

    useEffect(() => {
      if (userId) {
        handleGetChats();
        handleGetDirectMessages();
      }
    }, [userId]);

    useEffect(() => {
      selectedChatIdRef.current = selectedChatId;
    }, [selectedChatId]);

    useEffect(() => {
      const socket = wsRef.current;
      if (!socket) return;
      // Named event instead of a generic 'message' listener + JSON.parse.
      const receiveMessage = (messageData) => {
        console.log("Received newMessage:", messageData);
        if (messageData.chat_id === selectedChatIdRef.current) {
          setMessages(messages => {
            // Prevent duplicates: optimistic message was already added locally by the sender
            if (messages.some(m => m.id === messageData.id)) return messages;
            return [...messages, messageData];
          });
        }
      };

      const handleMessageDeleted = ({ chatId, messageId }) => {
        if (chatId !== selectedChatIdRef.current) return;
        setMessages(messages => messages.map(m =>
          m.id === messageId ? { ...m, deleted: true, content: null, image: null } : m
        ));
      };

      const handleUserMessagesDeleted = ({ chatId, userId: deletedUserId }) => {
        if (chatId !== selectedChatIdRef.current) return;
        setMessages(messages => messages.filter(m => m.sender_id !== deletedUserId));
      };

      const handleChatDeleted = ({ chatId, isGroupChat }) => {
        if (isGroupChat) {
          setGroupChats(prev => prev.filter(c => c.chat_id !== chatId));
        } else {
          setDirectMessages(prev => prev.filter(c => c.chat_id !== chatId));
        }
        if (chatId === selectedChatIdRef.current) {
          setSelectedChatId(null);
          setMessages([]);
        }
      };

      const handleParticipantLeft = ({ chatId, userId: leftUserId }) => {
        if (leftUserId === userId) {
          setGroupChats(prev => prev.filter(c => c.chat_id !== chatId));
          if (chatId === selectedChatIdRef.current) {
            setSelectedChatId(null);
            setMessages([]);
          }
          return;
        }
        if (chatId === selectedChatIdRef.current) {
          handleGetChatParticipants(chatId);
        }
      };

      socket.on('participantLeft', handleParticipantLeft);
      socket.on('newMessage', receiveMessage);
      socket.on('messageDeleted', handleMessageDeleted);
      socket.on('userMessagesDeleted', handleUserMessagesDeleted);
      socket.on('chatDeleted', handleChatDeleted);

      return () => {
        socket.off('newMessage', receiveMessage);
        socket.off('messageDeleted', handleMessageDeleted);
        socket.off('userMessagesDeleted', handleUserMessagesDeleted);
        socket.off('chatDeleted', handleChatDeleted);
        socket.off('participantLeft', handleParticipantLeft);
      };
    }, [wsReady]);

    const handleDeleteMessage = async (messageId) => {
      try {
        await chatApi.deleteChatMessage(selectedChatId, messageId);
        setMessages(messages => messages.map(m =>
          m.id === messageId ? { ...m, deleted: true, content: null, image: null } : m
        ));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }

    const handleClearMyMessages = async () => {
      try {
        await chatApi.deleteUserChatMessages(selectedChatId);
        setMessages(messages => messages.filter(m => m.sender_id !== userId));
      } catch (error) {
        console.error("Error clearing messages:", error);
      }
    }


    const loadMoreMessages = () => {
        if (!hasMore) return Promise.resolve();
        loadingMoreRef.current = true; // ← set ref
        const newOffset = offset + limit;
        setOffset(newOffset);
        return handleGetChatMessages(selectedChatId, limit, newOffset);
    }

    const sendMessage = (content) => {
      const socket = wsRef.current;
      if(!socket){
        console.error("Socket.IO not connected");
        return;
      }


      const message = {
        id: uuidv4(),
        content: content, 
        sender_id: userId,
        chat_id: selectedChatId,
        expire_at: new Date(Date.now() + deleteTimerSeconds * 1000),
        sent_at: new Date()
      }

      if(socket.connected) {
        socket.emit('sendMessageToUser', message);
        setMessages(messages => [...messages, message]); // Optimistic UI update
      }
      else{
        //TODO: Handle reconnection logic
        console.log("Socket.IO not connected");
      }
    }

    const handleGetChats = async  () => {
      try {
        const response = await chatApi.getGroupChats();
        setGroupChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    const handleGetDirectMessages = async  () => {
      try {
        const response = await chatApi.getDirectMessages();
        setDirectMessages(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    }

    const handleGetChatParticipants = async  (selectedChatId) => {
      try {
        const response = await chatApi.getChatParticipants(selectedChatId);
        setParticipants(response.data.participants);
      } catch (error) {
        console.error("Error fetching chat participants:", error);
      }
    }

    const handleCreateGroupChat = async (name, participants, chatImage) => {
      try {
        const response = await chatApi.createGroupChat(name, participants);
        const createdChat = response.data;

        const newGroupChat = {
          chat_id: createdChat.chat_id,
          id: createdChat.id,
          name: createdChat.name,
          chat_picture_url: createdChat.chat_picture_url,
        };

        setGroupChats(prev => [...prev, newGroupChat]);

        setSelectedChatId(newGroupChat.chat_id);


        //Upload photo TODO
        try {
            const key = await storageApi.uploadChatPicture(chatImage, newGroupChat.id);
            await chatApi.updateGroupChatPictureUrl(newGroupChat.id, key); // ← save key to DB
            //await handleGroupChatDownload();    // ← refresh the displayed picture
        } catch (err) {
            console.error("Chat picture upload failed:", err);
        }

        return newGroupChat;
        
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }

    const handleCreateDirectMessage = async (friend) => {
      try {
        const response = await chatApi.createDirectMessage(friend.id, null);
        setGroupChats(response.data);
        const createdChat = response.data;

        const newDirectMessage = {
          chat_id: createdChat.id,
          id: createdChat.id,
          name: friend.username,
          chat_picture_url: friend.profile_picture_url,
          other_user_id: friend.id,
        };

        setDirectMessages(prev => [...prev, newDirectMessage]);
        setSelectedChatId(newDirectMessage.chat_id);
        return newDirectMessage;
        
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }

    const handleDeleteGroupChat = async (chat) => {
      try {
        const response = await chatApi.deleteGroupChat(chat.chat_id);
        setGroupChats(prevChats => prevChats.filter(c => c.chat_id !== chat.chat_id));
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }

    const handleDeleteDirectMessage = async (chat) => {
      try {
        const response = await chatApi.deleteDirectMessage(chat.chat_id);
        setDirectMessages(prevChats => prevChats.filter(c => c.chat_id !== chat.chat_id));
      } catch (error) {
        console.error("Error creating group chat:", error);
      }
    }

    const handleGetChatMessages = async (selectedChatId, limit, offset) => {
      try {
        const response = await chatApi.getChatMessages(selectedChatId, limit, offset);
        const newMessages = response.data.messages.reverse(); // ← reverse to get oldest first

        if(newMessages.length < limit){
          setHasMore(false);
        }
        if(offset === 0){
          setMessages(newMessages);
        }
        else{
          setMessages(prev => [...newMessages, ...prev]);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        loadingMoreRef.current = false; // ← reset ref
      }
    }

    const handleLeaveGroupChat = async (chat, deleteMessages = false) => {
      try {
        await chatApi.leaveGroupChat(chat.chat_id, deleteMessages);
        setGroupChats(prevChats => prevChats.filter(c => c.chat_id !== chat.chat_id));
        if (chat.chat_id === selectedChatId) {
          setSelectedChatId(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error leaving group chat:", error);
      }
    }

    return (
      <ChatsContext.Provider value={{ participants, groupChats, directMessages, loading, selectedChatId, messages, hasMore, loadingMoreRef,
                                      handleGetChats, handleGetDirectMessages, handleGetChatParticipants, handleCreateGroupChat, handleGetChatMessages,
                                      handleCreateDirectMessage, setSelectedChatId, sendMessage, loadMoreMessages, handleDeleteGroupChat, 
                                      handleDeleteDirectMessage,handleDeleteMessage, handleClearMyMessages, handleLeaveGroupChat }}>
        {children}
      </ChatsContext.Provider>
    );
}

// Custom hook (named export)
export function useChats() {
    return useContext(ChatsContext);
}