import { useEffect, useRef } from 'react';
import { useChats } from '../contexts/ChatContext';
import { useUser } from '../contexts/UserContext';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { formatMessageTimestamp } from '../lib/utils';
import defaultImage from '../assets/defaultUser.jpg';

const ChatContainer = () => {
    const {messages, getMessagesByChatId, selectedChatId} = useChats();
    const {userId} = useUser();
    
    const bottomRef = useRef(null);

    const profilePicUrl = null;
    const OtherProfilePicUrl = null;

    useEffect(() => {
        // Fetch messages or perform any setup if needed
        getMessagesByChatId(selectedChatId)
        //getMessagesByChatId('dfeb231c-539b-440c-af50-79c52c14188d');

    }, [selectedChatId]);

    useEffect(() => {
        requestAnimationFrame(() => {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
    });    
    }, [messages]);


    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className= "flex-1 overflow-y-auto px-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat ${message.sender_id === userId ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={message.sender_id === userId ?  profilePicUrl || defaultImage : OtherProfilePicUrl || defaultImage}
                                    alt="Prfile Picture"
                                />
                            </div>
                        </div>

                        <div className= "chat-header mb-1">
                            <time className="text-xs opacity-50">
                                {formatMessageTimestamp(message.sent_at)}
                            </time>
                        </div>

                        <div className= "chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Message Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.content}
                        </div>
                    </div>
                ))}
                
                {/* Dummy div to scroll to bottom */}
                <div ref={bottomRef} />
            </div>


            <MessageInput/>
        </div>
    );
}
export default ChatContainer;