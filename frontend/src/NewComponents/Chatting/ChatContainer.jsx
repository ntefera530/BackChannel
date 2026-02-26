import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useEffect } from 'react';
import { useChats } from '../../contexts/ChatContext';

const ChatContainer = () => {
    const {selectedChatId} = useChats();
    useEffect(() => {

    }, [selectedChatId]);
    
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>           
            <MessageList/>
            <MessageInput/>
        </div>
    );
}
export default ChatContainer;